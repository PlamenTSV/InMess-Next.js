import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../database/connection';

import User from '@/models/User';
import { serialize } from 'cookie';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async resolve => {
    await connectMongo();
    
    let loginSuccessful = false;
    const {username, password} = req.body;
  
    const users = await User.find({username: username});
    
    users.forEach(user => {
      if(bcrypt.compareSync(password, user.password)){
        loginSuccessful = true;

        const sessionToken = jwt.sign({user}, process.env.SESSION_SECRET, { expiresIn: '1d' });

        res.setHeader('Set-Cookie', serialize('sessionToken', sessionToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict', 
          maxAge: 60 * 60 * 1000 * 24,
          path: '/'
        }));
        
      }
    })
    
    res.status(loginSuccessful? 200 : 401).send(loginSuccessful? {message: 'Successful login!'} : {message: 'No such user! Please check your credentials'});
    resolve();
  })
}


