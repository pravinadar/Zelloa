import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";


export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;

        if(!postId){
            return res.status(400).json({
                message: "Post ID is required"
            });
        }

        if(!text || text.trim() === ""){
            return res.status(400).json({
                message: "Comment text is required"
            });
        }

        const postExists = await Post.findById(postId);
        if(!postExists){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const newComment = new Comment({
            admin: req.user.id,
            post: postExists._id,
            text: text.trim()
        });

        const savedComment = await newComment.save();

        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: savedComment._id } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: { replies: savedComment._id }
            },
            { new: true }
        );

        res.status(201).json({
            message: "Comment added successfully",
            comment: savedComment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding comment",
            error: error.message
        });   
    }
}

export const deleteComments = async (req, res) => {
    try {
        const {postId, commentId} = req.params;
        if(!postId || !commentId){
            return res.status(400).json({
                message: "Post ID and Comment ID are required"
            });
        }

        const postExists = await Post.findById(postId);
        if(!postExists){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const commentExists = await Comment.findById(commentId);
        if(!commentExists){
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if(postExists.comments.includes(commentExists._id)){
            if(commentExists.admin._id.toString() !== req.user.id.toString()){
                return res.status(403).json({
                    message: "You are not authorized to delete this comment"
                });
            }
        }

        await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: commentExists._id } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { replies: commentExists._id } },
            { new: true }
        );

        await Comment.findByIdAndDelete(commentExists._id);

        res.status(200).json({
            message: "Comment deleted successfully"
        });

        } catch (error) {
        res.status(500).json({
            message: "Error deleting comment",
            error: error.message
        });
    }
}