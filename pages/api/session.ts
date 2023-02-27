import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        const decoded = jwt.verify(req.cookies.sessionToken!, process.env.SESSION_SECRET as Secret) as JwtPayload;
        

        const userData = {
            id: decoded.user._id,
            username: decoded.user.username,
            email: decoded.user.email
        }
        
        res.status(200).send(userData);
        resolve();
    })
}