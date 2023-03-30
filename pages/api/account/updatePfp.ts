import cloudinary from "@/database/cloudinary";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID, newImage} = req.body;

    const user = await User.findById(userID);

    const currentIcon = user.icon;

    const clResponse = await cloudinary.v2.uploader.upload(newImage, {use_filename: true, folder: 'profile-pictures', responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1000 }})
    
    user.icon = clResponse.etag;
    await user.save();

    if((await User.find({icon: currentIcon})).length === 0){
        cloudinary.v2.uploader.destroy('profile-pictures/' + currentIcon)
        .then(result => console.log(result))
        .catch(error => console.error(error));
    }
    
    res.status(200).send({message: 'Success', image: cloudinary.v2.url('profile-pictures/' + clResponse.etag)});
}