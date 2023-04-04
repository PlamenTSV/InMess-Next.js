import Channel from "@/models/Channel";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { channelID } = req.query;

    try {
        const result = await Channel.deleteOne({_id: channelID});

        if(result.deletedCount === 0){
            res.status(404).send({message: 'Channel not found'});
            return;
        }

        res.status(200).end();
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Error while deleting channel'});
    }
}