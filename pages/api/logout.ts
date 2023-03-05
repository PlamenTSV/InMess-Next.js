import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie', serialize('sessionToken', '', {
        maxAge: -1,
        path: '/'
      }));

    res.status(200).end();
}