import cloudinary from "@/database/cloudinary";
import connectMongo from "@/database/connection";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const newMessage = new Message(req.body);
    const user = await User.findById(req.body.senderID);

    try {
        await newMessage.save();

        res.status(200).send({
            id: newMessage.id,
            senderUsername: user.username,
            senderIcon: cloudinary.v2.url('profile-pictures/' + user.icon),
            sentAt: req.body.sentAt
        });
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Error while sending message'});
    }
}