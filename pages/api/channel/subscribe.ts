import pusherServer from "@/utils/pusherServer";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await pusherServer.trigger(req.body.channel, 'client-member-joined', req.body.userInfo);

        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}