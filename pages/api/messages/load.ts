import cloudinary from "@/database/cloudinary";
import connectMongo from "@/database/connection";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await connectMongo();
      
      const { channel } = req.query;
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
      });

      const results = await Promise.all(messagePromises);
      res.status(200).send(results);

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error loading messages' });
    }
  }