import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { fetchData } from "@utils/helper";
import { API_URL } from "@config";
import { User, AuthUserResponse } from "@tstypes/User";

interface NextExtendedApiRequest extends NextApiRequest {
    body: {
        identifier: string;
        password: string;
    };
}

type Data = {
    user: User | undefined;
    message: string;
};

export default async function handler(req: NextExtendedApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        const { identifier, password } = req.body;
        const data = await fetchData<AuthUserResponse>(`${API_URL}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password }),
        });
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "strict",
                path: "/",
            })
        );
        res.status(200).json({
            user: data.user,
            message: "Token generated successful.",
        });
    }

    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
        message: `Method ${req.method} is not supported.`,
        user: undefined,
    });
}
