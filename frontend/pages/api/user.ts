import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { User } from "@tstypes/User";
import { fetchData } from "@utils/helper";
import { API_URL } from "@config";

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
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: "Not Authorized", user: undefined });
    }

    const { token } = cookie.parse(req.headers.cookie);
    const user = await fetchData<User>(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (user) {
      return res.status(200).json({ user: user, message: "Authorized" });
    }

    return res.status(403).json({ user: user, message: "User Forbidden" });
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).json({
    message: `Method ${req.method} is not supported.`,
    user: undefined,
  });
}
