import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>(async resolve => {
        const { newPassword, oldPassword } = req.body;
        res.status(200).send({az: 'Success'});
        resolve();
    })
}