import express from "express";
import { getUserDetails, Login, SignUp } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Working fine!");
})

router.post("/signup", SignUp)
router.post("/login", Login)
router.get("/user/:id", getUserDetails)

export default router;