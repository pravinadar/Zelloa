import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true    
    },
    bio:{
        type: String,
        default: "",
        trim: true,
    },
    profilePicture:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        trim: true,
    },
    public_id:{
        type: String,
        trim: true,
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    zips:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    rezips:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    replies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],

},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;