import cloudinary from "@/database/cloudinary";
import connectMongo from "@/database/connection";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { channel } = req.query;
      const DBmessages = await Message.find({channelID: channel});

      res.status(200).send(DBmessages);

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error loading messages' });
    }
  }