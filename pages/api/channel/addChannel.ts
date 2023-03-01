import { NextApiRequest, NextApiResponse } from "next";

import connectMongo from "@/database/connection";
import Channel from "@/models/Channel";

import cloudinary from "@/database/cloudinary";

interface CloudinaryResponse {
    etag: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        await connectMongo();
        const {image, name} = req.body;

        cloudinary.v2.uploader.upload(image, {use_filename: true, folder: 'channel-banners', responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1000 }})
        .then(async (response: CloudinaryResponse) => {

            const channel = new Channel({
                name: name,
                icon: response.etag
            })
            const newChannel = await channel.save();
            
            res.status(200).send({id: newChannel._id.toString()});
            resolve();
        })        
    })
}