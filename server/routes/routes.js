import express from "express";

import { 
    followUser, 
    getUserDetails, 
    Login, 
    logoutUser, 
    searchUser, 
    SignUp, 
    UpdateProfile, 
    userInfo
} from "../controllers/user.controller.js";
import { 
    addPost, 
    allPosts,
    deletePost,
    likePost,
    repost,
    singlePost,
} from "../controllers/post.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Working fine!");
})

// Authentication routes
router.post("/signup", SignUp)
router.post("/login", Login)

// User routes
router.get("/user/:id", authMiddleware, getUserDetails)
router.put("/user/follow/:id", authMiddleware, followUser)
router.put("/user/update/:id", authMiddleware, UpdateProfile)
router.get("/user/search/:query", authMiddleware, searchUser)
router.post("/user/logout", authMiddleware, logoutUser)
router.get("/user", authMiddleware, userInfo);

// Post routes
router.post("/zip/add", authMiddleware, addPost)
router.get("/zip",authMiddleware,allPosts)
router.delete("/zip/:id", authMiddleware, deletePost)
router.put("/zip/like/:id", authMiddleware, likePost)
router.post("/zip/rezip/:id", authMiddleware, repost)
router.get("/zip/:id", authMiddleware, singlePost)

export default router;