import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import cloudinary from "../config/cloudinary.js";

import User from "../models/user.model.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const SignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({
                    message: "All fields are required"
                });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res
                .status(400)
                .json({
                    message: "User already exists with this email"
                });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!hashedPassword) {
            return res
                .status(500)
                .json({
                    message: "Error hashing password"
                });
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        if (!savedUser) {
            return res
                .status(500)
                .json({
                    message: "Error saving user"
                });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "JWT secret is not defined in environment variables"
            });
        }

        const accessToken = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        if (!accessToken) {
            return res
                .status(500)
                .json({
                    message: "Error generating access token"
                });
        }

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: true,
            partitioned: true
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });

    } catch (error) {
        res.status(500)
            .json({
                message: "Internal Server Error",
                error: error.message
            });
    }
}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        const isPasswordMatching = await bcrypt.compare(password, userExists.password);

        if (!isPasswordMatching) {
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }

        // console.log("Password from request:", password);
        // console.log("User password from DB:", userExists.password);
        // console.log("User object:", userExists);

        const accessToken = jwt.sign(
            { id: userExists._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        if (!accessToken) {
            return res.status(500).json({
                message: "Error generating access token"
            });
        }

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: true
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: userExists._id,
                email: userExists.email
            },
        });

    } catch (error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }


}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const getUserDetails = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "User ID is required"
        });
    }

    const user = await User.findById(id)
        .select("-password")
        .populate("followers")
        .populate({
            path: "zips",
            populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }]
        })
        .populate({
            path: "rezips",
            populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }]
        })
        .populate({
            path: "replies",
            populate: [{ path: "admin" }]
        })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        message: "User details fetched successfully",
        user: { // test
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
            followers: user.followers.length,
            zips: user.zips.length,
            rezips: user.rezips.length,
            replies: user.replies.length
        }
    });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const followUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const userExists = await User.findById(id);

        if (!userExists) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // If already following, unfollow the user
        if (userExists.followers.includes(req.user.id)) {
            await User.findByIdAndUpdate(
                userExists._id,
                { $pull: { followers: req.user.id } },
                { new: true }
            );

            return res.status(200).json({
                message: `Unfollowed ${userExists.username}`,
                user: {
                    id: userExists._id,
                    username: userExists.username,
                    email: userExists.email,
                    followers: userExists.followers.length
                }
            });
        }

        // follow the user
        await User.findByIdAndUpdate(
            userExists._id,
            { $push: { followers: req.user.id } },
            { new: true }
        );

        return res.status(200).json({
            message: `Followed ${userExists.username}`,
            user: {
                id: userExists._id,
                username: userExists.username,
                email: userExists.email,
                followers: userExists.followers.length
            }
        });

    } catch (error) {
        console.error('Error in followUser:', error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });

    }
}


// Helper: promisify formidable parsing
const parseForm = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({});
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const UpdateProfile = async (req, res) => {
    try {
        const userExists = await User.findById(req.user.id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Parse incoming form data
        const { fields, files } = await parseForm(req);

        // Debugging logs
        // console.log("Fields:", fields);
        // console.log("File keys:", Object.keys(files));;

        if (fields.bio) {
            await User.findByIdAndUpdate(
                req.user.id,
                { bio: fields.bio },
                { new: true }
            );
        }

        if (!files.profilePicture) {
            return res.status(400).json({
                message: "Media file is required"
            });
        }

        if (files) {
            let uploadedImage;

            try {
                uploadedImage = await cloudinary.v2.uploader.upload(
                    files.profilePicture?.filepath,
                    { folder: "Zelloa/ProfilePictures" }
                );
            } catch (error) {
                console.error("Cloudinary Upload Error:", error.message);
                return res.status(500).json({
                    message: "Failed to upload image",
                    error: error.message
                });
            }

            // Delete old image from Cloudinary if exists
            if (userExists.public_id) {
                await cloudinary.v2.uploader.destroy(userExists.public_id);
            }

            // console.log(uploadedImage)

            // Update DB with new profile picture URL & public_id
            await User.findByIdAndUpdate(
                req.user.id,
                {
                    profilePicture: uploadedImage.secure_url,
                    public_id: uploadedImage.public_id
                },
                { new: true }
            );
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: await User.findById(req.user.id).select("username bio profilePicture")
        });

    } catch (error) {
        console.error("Error Updating Profile:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const searchUser = async (req, res) => {
    try {
        const { query } = req.params;

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        });

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }

        res.status(200).json({
            message: "Users found",
            users: users.map(user => ({
                // id: user._id,
                username: user.username,
                profilePicture: user.profilePicture
            }))
        });

    } catch (error) {
        console.error('Error in searchUser:', error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });   
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        });
    
        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error('Error in logoutUser:', error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
        
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
*/

export const userInfo = async (req, res) => {
    try {
        res.status(200).json({
            user: req.user
        })
    }catch (error) {
        console.error('Error in userInfo:', error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}