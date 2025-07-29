import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            secure: true
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

        console.log("Password from request:", password);
        console.log("User password from DB:", userExists.password);
        console.log("User object:", userExists);

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
            path:"zips",
            populate:[{path:"likes"},{path:"comments"},{path:"admin"}]
        })
        .populate({
            path:"rezips",
            populate:[{path:"likes"},{path:"comments"},{path:"admin"}]
        })
        .populate({
            path:"replies",
            populate:[{path:"admin"}]
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