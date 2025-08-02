import express from "express";
import { 
    followUser, 
    getUserDetails, 
    Login, 
    logoutUser, 
    searchUser, 
    SignUp, 
    UpdateProfile 
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Working fine!");
})

router.post("/signup", SignUp)
router.post("/login", Login)

router.get("/user/:id", authMiddleware, getUserDetails)
router.put("/user/follow/:id", authMiddleware, followUser)
router.put("/user/update/:id", authMiddleware, UpdateProfile)
router.get("/user/search/:query", authMiddleware, searchUser)
router.post("/user/logout", authMiddleware, logoutUser)

export default router;