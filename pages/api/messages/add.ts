import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "@/database/cloudinary";

import Message from "@/models/Message";
import User from "@/models/User";
import pusherServer from "@/utils/pusherServer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const newMessage = new Message(req.body);
    const user = await User.findById(req.body.senderID);

    try {
        await newMessage.save();

        await pusherServer.trigger('channel-' + newMessage.channelID, 'message', {
            id: newMessage.id,
            senderUsername: user.username,
            senderIcon: cloudinary.v2.url('profile-pictures/' + user.icon),
            sentAt: req.body.sentAt,
            content: newMessage.content
        });

        res.status(200).send({message: 'New message'});
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Error while sending message'});
    }
}