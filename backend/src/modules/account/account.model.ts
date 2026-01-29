import { users } from "./account.schema.ts";
import { type UserRecord } from "./account.types.ts";
import { db } from "../../db/drizzle.ts";
import { eq } from "drizzle-orm";

export class UserModel {
    async findUser(email: string): Promise<UserRecord| null> {
        const [user] = await db
            .select().from(users).where(eq(users.email, email)).limit(1);
        if (user) {
            return user
        }
        return null;
    }
    async createUser(
        data: {
            id: string;
            email: string;
            password: string;
            lastName: string;
            firstName: string;
    }): Promise<UserRecord> {
        const [newUser] = await db.insert(users).values(data).returning();
        if (!newUser) {
            throw new Error("Failed to create user");
        }
        return newUser;
    }
}

export const userModel = new UserModel;