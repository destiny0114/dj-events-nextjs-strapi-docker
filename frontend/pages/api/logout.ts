import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { User } from "@tstypes/User";

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
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: Number(new Date(0)),
                sameSite: "strict",
                path: "/",
            })
        );
        res.status(200).json({
            user: undefined,
            message: "Token destroyed.",
        });
    }

    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
        message: `Method ${req.method} is not supported.`,
        user: undefined,
    });
}
