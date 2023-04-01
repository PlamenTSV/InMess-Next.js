import cloudinary from "@/database/cloudinary";
import connectMongo from "@/database/connection";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();
    const { channel } = req.query;

    try{    
        const DBmessages = await Message.find({channelID: channel});
        const messagePromises = DBmessages.map(async mess => {
            const user = await User.findById(mess.senderID);
            return {
                id: mess.id,
                senderUsername: user.username,
                senderIcon: cloudinary.v2.url('profile-pictures/' + user.icon),
                sentAt: mess.sentAt,
                content: mess.content
            }
        })
        Promise.all(messagePromises).then(results => {
            res.status(200).send(results);
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Couldn\'t load channels'});
    }
}