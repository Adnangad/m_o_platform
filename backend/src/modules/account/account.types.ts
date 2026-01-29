export type CreateUserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserWithoutPassword {
    id: string;
    email: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
}

export type UserRecord = {
    id: string;
    email: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export type JWTPayload = {
    userId: string;
    isAdmin: boolean;
}