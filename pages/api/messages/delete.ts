import Message from "@/models/Message";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { messageID } = req.query;

    try {
        const result = await Message.deleteOne({_id: messageID});

        if(result.deletedCount === 0){
            res.status(404).send({message: 'Message not found'});
            return;
        }

        res.status(200).send({message: 'Success'})
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Error while deleting message'});
    }
    
}