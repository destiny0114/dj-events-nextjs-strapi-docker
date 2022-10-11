import { User } from "./User";

type UserFields = {
    username: string;
    email: string;
    password: string;
    confirm_password?: string;
};

export type UserRegister = UserFields;

export type UserLogin = Pick<UserFields, "email" | "password">;
