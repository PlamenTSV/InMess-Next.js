import type { NextApiRequest, NextApiResponse } from "next";

import connectMongo from "@/database/connection";
import User from "../../models/User";

import { serialize } from "cookie";

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
            password: hashedPassword,
            icon: ''
        })

        try{
            const newRegister = await user.save();

            const sessionToken = jwt.sign({id: newRegister.id}, process.env.SESSION_SECRET, { expiresIn: '1d' });

            res.setHeader('Set-Cookie', serialize('sessionToken', sessionToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict', 
                maxAge: 60 * 60  * 24,
                path: '/'
            }));

        } catch(error){
            console.log(error);
        }

        res.status(200).send({message: 'Registered user'});
        return resolve();
    })
}