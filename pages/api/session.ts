import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

function isTokenExpired(token: string): boolean{
    try{
        const decoded = jwt.decode(token) as JwtPayload;
        const expirationTime = decoded.exp! * 1000;
        const now = Math.floor(Date.now() / 1000);

        console.log(expirationTime <= now);

        return expirationTime <= now;
    } catch (error) {
        return true;
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        const token = req.cookies.sessionToken;

        if(token && isTokenExpired(token)){
            console.log('expired');
            res.status(401).end();
        }
        console.log('not expired');
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