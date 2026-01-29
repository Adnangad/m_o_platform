import { Router, type Request, type Response } from "express";
import { accountService } from "../modules/account/account.service.ts";
import { json } from "express";

const authRoutes = Router();

authRoutes.post("/register", async (req: Request, res: Response) => {
    try {
        const data = req.body.data;
        const result = await accountService.registerUser(data);
        if (result.success && result.user) {
            const token = await accountService.generateToken(result.user.id, result.user?.isAdmin);
            res.cookie("token" ,token);
            res.json({success: result.success, message: result.message}).statusCode=200;
        }
    }
    catch(error) {
        
    }
})