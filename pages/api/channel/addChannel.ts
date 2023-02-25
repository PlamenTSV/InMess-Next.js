import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        const {image, name} = req.body;
        console.log(name);
        res.status(200).end();
        resolve()
    })
}