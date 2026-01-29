import type { UserWithoutPassword, CreateUserInput, JWTPayload } from "./account.types.ts";
import { userModel } from "./account.model.ts";
import { uuidv7 } from "uuidv7";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config();

export interface RegisterUserResult {
    success: boolean;
    message: string;
    user: UserWithoutPassword | null;
}

export class AccountService {
    async registerUser(input: CreateUserInput):Promise<RegisterUserResult> {
        try {
            const exists = await userModel.findUser(input.email);
            if (exists) {
                throw new Error("An account with this email already exists");
            }
            else {
                const sid = uuidv7();
                const hashedPassword = await bcrypt.hash(input.password, 10);
                input.password = hashedPassword
                const newUser = await userModel.createUser({
                    id: sid,
                    email: input.email,
                    password: input.password,
                    lastName: input.lastName,
                    firstName: input.firstName,
                });
                return {
                    success: true,
                    message: "User created Successfully",
                    user: newUser
                }
            }
        }catch(error) {
            return {
                success: false,
                message: error as string,
                user: null
            }
        }
    }
    async generateToken(userId: string, isAdmin: boolean): Promise<string> {
        const payload = {userId, type: 'access', isAdmin: isAdmin};
        return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: 60*60});
    }
    verifyToken(token: string): JWTPayload{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
        return decoded;
    }
}

export const accountService = new AccountService()