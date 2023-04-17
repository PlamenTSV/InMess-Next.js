import connectMongo from "@/database/connection";
import Message from "@/models/Message";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();
    try {
      const { channel } = req.query;
      const DBmessages = await Message.find({channelID: channel});

      const response = DBmessages.map(mess => {
        return {
          id: mess.id,         
          senderUsername: mess.senderUsername,
          senderIcon: mess.senderIcon,
          sentAt: mess.sentAt,
          content: mess.content
        }
      })

      res.status(200).send(response);

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error loading messages' });
    }
  }