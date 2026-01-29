export type CreateUserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserWithoutPassword {
    email: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
}

export type UserRecord = {
    email: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}