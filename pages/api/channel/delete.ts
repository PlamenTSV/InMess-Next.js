import cloudinary from "@/database/cloudinary";
import Channel from "@/models/Channel";
import Message from "@/models/Message";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { channelID } = req.query;

    const { icon: iconToDelete } = await Channel.findById({_id: channelID});

    try {
        const result = await Channel.deleteOne({_id: channelID});

        if(result.deletedCount === 0){
            res.status(404).send({message: 'Channel not found'});
            return;
        }

        cloudinary.v2.uploader.destroy('channel-banners/' + iconToDelete)
        .then(() => console.log('Deleted channel with id ' + channelID))
        .catch(error => console.error(error));

        await Message.deleteMany({ channelID: channelID });

        res.status(200).end();
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Error while deleting channel'});
    }
}