import Channel from "@/models/Channel";
import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "@/database/cloudinary";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const channelsDB = await Channel.find();
    
    const channels = channelsDB.map(channel => {
        return {
            id: channel._id.toString(),
            name: channel.name,
            icon: cloudinary.v2.url('channel-banners/' + channel.icon)
        }
    })

    res.status(200).send({channels: channels});
}