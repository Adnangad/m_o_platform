import { Router, type Request, type Response } from "express";
import { accountService } from "../modules/account/account.service.ts";

const authRoutes = Router();

authRoutes.post("/register", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log("DATA IS:: ", data);
        if (!data || !data.email || !data.password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
        console.log("DATA:: ", data);
        const result = await accountService.registerUser(data);
        
        if (result.success && result.user) {
            const token = await accountService.generateToken(
                result.user.id,
                result.user?.isAdmin
            );
            
            // Set cookie with security options
            res.cookie("token", token, {
                httpOnly: true,  // Prevents XSS attacks
                secure: process.env.NODE_ENV === "production", // HTTPS only in production
                sameSite: "strict", // CSRF protection
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
            
            return res.status(200).json({
                success: result.success,
                message: result.message
            });
        } else {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch(error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to create user"
        });
    }
});

export default authRoutes;