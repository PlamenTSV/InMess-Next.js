import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const bcrypt = require('bcryptjs');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userID, newCredential: newEmail, password} = req.body;

    const user = await User.findById(userID);

    if( !bcrypt.compareSync(password, user.password) ){
        res.status(401).send({error: 'Wrong password'});
        return;
    }
    
    user.email = newEmail;
    await user.save()

    res.status(200).send({message: 'Success'});
}