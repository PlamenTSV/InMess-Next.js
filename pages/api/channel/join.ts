import cloudinary from "@/database/cloudinary";
import Channel from "@/models/Channel";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { channelID, userID } = req.body;
    
        const channel = await Channel.findById(channelID);
        channel.members.push(userID);
        await channel.save();
    
        res.status(200).send({
            id: channel._id,
            name: channel.name,
            icon: cloudinary.v2.url('channel-banners/' + channel.icon)
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Couldn\'t create channel'});
    }
}