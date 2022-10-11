export type User = {
    id: string;
    username?: string;
    email: string;
};

export type AuthUserResponse = {
    jwt: string;
    user: User;
};

export type UserResponse = {
    user: User;
};
