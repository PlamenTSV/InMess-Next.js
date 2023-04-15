import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "@/database/cloudinary";

import Message from "@/models/Message";
import pusherServer from "@/utils/pusherServer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const newMessage = new Message(req.body);
    console.log(newMessage.icon);

    try {
        await newMessage.save();

        await pusherServer.trigger('channel-' + newMessage.channelID, 'message', {
            id: newMessage.id,
            senderUsername: newMessage.senderUsername,
            senderIcon: newMessage.senderIcon,
            sentAt: req.body.sentAt,
            content: newMessage.content
        });

        res.status(200).send({message: 'New message'});
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Error while sending message'});
    }
}