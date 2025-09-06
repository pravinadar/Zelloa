import formidable from "formidable";

import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const addPost = async (req, res) => {
    try {
        const form = formidable({});

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    message: "Error parsing form data",
                    error: err.message
                });
            }

            const post = new Post();

            if (fields.text) {
                post.text = fields.text.trim();
            }

            if (files.media) {
                const uploadedImage = await cloudinary.v2.uploader.upload(
                    files.media.filepath,
                    { folder: "Zelloa/Posts" }
                )

                if (!uploadedImage) {
                    return res.status(500).json({
                        message: "Error uploading image to Cloudinary"
                    });
                }

                post.media = uploadedImage.secure_url;
                post.public_id = uploadedImage.public_id;
            }
            post.admin = req.user.id;

            const newPost = await post.save();

            await User.findByIdAndUpdate(
                req.user.id,
                { $push: { zips: newPost._id } },
                { new: true }
            )

            res.status(201).json({
                message: "Post added successfully",
                post: newPost
            });
        })

    } catch (error) {
        res.status(500).json({
            message: "Error adding post",
            error: error.message
        });
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const allPosts = async (req, res) => {
    try {
        const { page } = req.query;
        let pageNumber = page;

        if (!page || page === undefined) {
            pageNumber = 1;
        }

        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * 10)
            .limit(10)
            .populate({
                path: "admin",
                select: "-password"
            })
            .populate({
                path: "likes",
                select: "-password"
            })
            .populate({
                path: "comments",
                populate: {
                    path: "admin",
                    model: "User"
                }
            });

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: posts,
            page: pageNumber
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching posts",
            error: error.message
        });
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "Post ID is required"
            });
        }

        const postExists = await Post.findById(id);
        if (!postExists) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const userId = req.user.id.toString();
        const adminId = postExists.admin._id.toString();

        if (userId !== adminId) {
            return res.status(403).json({
                message: "Unauthorized to delete this post"
            });
        }

        // Delete post image from Cloudinary if it exists
        if (postExists.public_id) {
            await cloudinary.v2.uploader.destroy(
                postExists.public_id,
                (error, result) => {
                    if (error) {
                        return res.status(500).json({
                            message: "Error deleting image from Cloudinary",
                            error: error.message
                        });
                    }
                    console.log(result);
                }
            );
        }

        // Delete comments associated with the post
        await Comment.deleteMany({
            _id: {
                $in: postExists.comments
            }
        });

        // Update User model to remove post references
        await User.updateMany(
            {
                $or: [
                    { zips: id },
                    { rezips: id },
                    { replies: id }
                ]
            },
            {
                $pull: {
                    zips: id,
                    rezips: id,
                    replies: id
                }
            },
            { new: true }
        );

        // Delete the post
        await Post.findByIdAndDelete(id);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Post ID is required"
            });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const userId = req.user.id;

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            // User has already liked the post, so we remove the like
            await Post.findByIdAndUpdate(
                id,
                { $pull: { likes: userId } },
                { new: true }
            );

            return res.status(200).json({
                message: "Post unliked successfully",
                likes: post.likes.length - 1
            });
        }

        // User has not liked the post, so we add the like
        await Post.findByIdAndUpdate(
            id,
            { $push: { likes: userId } },
            { new: true }
        );

        res.status(200).json({
            message: "Post liked successfully",
            likes: post.likes.length + 1
        });

    } catch (error) {
        res.status(500).json({
            message: "Error liking post",
            error: error.message
        });
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const repost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Post ID is required"
            });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // convert the string representation of the ObjectId into a proper MongoDB ObjectId instance.
        const objectId = new mongoose.Types.ObjectId(id);

        if (req.user.rezips.includes(objectId)) {
            return res.status(400).json({
                message: "You have already reposted this post"
            });
        }

        await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: { rezips: post._id }
            },
            { new: true }
        )

        res.status(200).json({
            message: "Post reposted successfully",
            post: post
        });

    } catch (error) {
        res.status(500).json({
            message: "Error reposting",
            error: error.message
        })
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const singlePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Post ID is required"
            });
        }

        const post = await Post.findById(id).populate({
            path: "admin",
            select: "-password"
        }).populate({
            path: "likes",
            select: "-password"
        }).populate({
            path: "comments",
            populate: {
                path: "admin",
                select: "-password"
            }
        });

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post fetched successfully",
            post: post
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching post",
            error: error.message
        });
    }
}