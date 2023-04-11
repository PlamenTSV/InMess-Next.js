import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../database/connection';

import User from '@/models/User';
import { serialize } from 'cookie';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();
  
    const {username, password} = req.body;

    try {
      const users = await User.find({username: username});
    
      users.forEach(user => {
        if(bcrypt.compareSync(password, user.password)){
    
          const sessionToken = jwt.sign({id: user.id}, process.env.NEXT_PUBLIC_SESSION_SECRET, { expiresIn: '1d' });

          res.setHeader('Set-Cookie', serialize('sessionToken', sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict', 
            maxAge: 60 * 60  * 24,
            path: '/'
          }));
          
        }
      })
      
      res.status(200).send({message: 'Successful login!'});
    } catch (error) {
      console.log(error);
      res.status(400).send({message: 'No such user found!'});
    }
}


