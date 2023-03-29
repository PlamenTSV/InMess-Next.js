import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import User from "@/models/User";
import cloudinary from "@/database/cloudinary";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        const decoded = jwt.verify(req.cookies.sessionToken!, process.env.SESSION_SECRET as Secret) as JwtPayload;

        const user = await User.findById(decoded.id);
        
        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            icon: cloudinary.v2.url('profile-pictures/' + user.icon)
        }
        
        res.status(200).send(userData);
        resolve();
    })
}