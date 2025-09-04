import jwt from "jsonwebtoken";

import User from '../models/user.model.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
*/

const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({
                message: "Authentication token is required"
            });
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid authentication token"
            });
        }

        const user = await User.findById(decoded.id)
            .populate("followers")
            .populate("replies")
            .populate("zips")
            .populate("rezips");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user; // Attach the user object to the request

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error('Error in authMiddleware:', error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export default authMiddleware;