import pusherServer from "@/utils/pusherServer";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const authResponse = pusherServer.authorizeChannel(socketId, channel);
    res.send(authResponse);
}