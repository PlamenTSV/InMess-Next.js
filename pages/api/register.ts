import type { NextApiRequest, NextApiResponse } from "next";

import connectMongo from "@/database/connection";
import User from "../../models/User";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        await connectMongo();
        let hashedPassword;

        const {username, email, password} = req.body;

        hashedPassword = bcrypt.hashSync(password);

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        try{
            const newRegister = await user.save();

            const sessionToken = jwt.sign({newRegister}, process.env.SESSION_SECRET, {
                expiresIn: '1h',
                cookie: {
                    name: 'session',
                    httpOnly: true,
                    secure: true, 
                    maxAge: 60 * 60 * 1000 //1 hour
                }
            });

            res.setHeader('Set-Cookie', `sessionToken=${sessionToken}`);

        } catch(error){
            console.log(error);
        }

        res.status(200).send({message: 'Registered user'});
        return resolve();
    })
}