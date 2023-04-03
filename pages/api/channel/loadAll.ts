import Channel from "@/models/Channel";
import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "@/database/cloudinary";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = req.query;
    
    if (!user) {
        return res.status(400).send({ message: 'User is undefined' });
    }
    
    try {
        const channelsDB = await Channel.find({members: user});
        
        const channels = channelsDB.map(channel => {
            return {
                id: channel._id.toString(),
                name: channel.name,
                icon: cloudinary.v2.url('channel-banners/' + channel.icon)
            }
        })
    
        res.status(200).send({channels: channels});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Couln\'t load channels'})
    }
}