import Channel from "@/models/Channel";
import { ObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { channelID, userID } = req.query;

    try {
        const channel = await Channel.findById(channelID);
        channel.members = channel.members.filter((member: ObjectId) => member.toString() !== userID);
        await channel.save();

        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Couldn\'t leave channel'})
    }
}