import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
        trim: true,
    },
    media: {
        type: String,
        default: "",
        trim: true,
    },
    public_id: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }]

}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;