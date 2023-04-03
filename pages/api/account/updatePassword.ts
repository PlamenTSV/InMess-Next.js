import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const bcrypt = require('bcryptjs');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { userID, newPassword, oldPassword } = req.body;

    const user = await User.findById(userID);
    if( !bcrypt.compareSync(oldPassword, user.password) ){
        res.status(401).send({error: 'Wrong password'});
    } else {
        user.password = bcrypt.hashSync(newPassword);
        await user.save();
        console.log('Changed password for user ' + userID);
        res.status(200).send({message: 'Changed password'});
    }
}