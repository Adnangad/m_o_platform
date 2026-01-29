import type { UserWithoutPassword, CreateUserInput } from "./account.types.ts";
import { userModel } from "./account.model.ts";
import { uuidv7 } from "uuidv7";

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
}