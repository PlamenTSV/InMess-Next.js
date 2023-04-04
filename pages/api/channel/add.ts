import { NextApiRequest, NextApiResponse } from "next";

import Channel from "@/models/Channel";

import cloudinary from "@/database/cloudinary";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {image, name, creator} = req.body;

        const channelIcon = await cloudinary.v2.uploader.upload(image, {use_filename: true, folder: 'channel-banners', responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1000 }})
        
        const channel = new Channel({
            name: name,
            icon: channelIcon.etag,
            owner: creator,
            members: [creator]
        })
        const newChannel = await channel.save();
        
        res.status(200).send({
            id: newChannel._id.toString(),
            name: name,
            icon: cloudinary.v2.url('channel-banners/' + channelIcon.etag),
            owner: creator
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Couldn\'t create channel'});
    }
        
}