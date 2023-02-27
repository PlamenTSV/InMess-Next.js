import { NextApiRequest, NextApiResponse } from "next";
const cloudinary = require('../../../database/cloudinary');

interface CloudinaryResponse {
    etag: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        const {image, name} = req.body;
        //console.log(image, name);

        // cloudinary.v2.uploader.upload(image, {use_filename: true, folder: 'channel-banners', responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1000 }})
        // .then((response: CloudinaryResponse) => {
        //     const cloudImage = response.etag;
        //     console.log(cloudImage);
        // })

        res.status(200).end();
        resolve()
    })
}