import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { firestore } from '../../../firebase';

const secret = process.env.SECRET

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(!req.body.username || !req.body.password) return res.status(400).json({ message: 'Information not provided' })

    const username = req.body.username;
    const password = req.body.password;


    const accounts = firestore.collection('accounts');

    const filtered = await accounts
    .where('username', '==', username)
    .get()

    if(!filtered.docs.length) {
        return res.status(404).json({ message: 'account.notfound' })
    }

    const account = filtered.docs[0]?.data()

    const compare = await bcrypt.compare(password, account.password)

    if(!compare) {
        res.status(401).json({
            message: 'password.incorrect'
        })

        return
    }

    const accountId = filtered.docs[0]?.id

     return res.status(200).json({
         token: jwt.sign(
             { account: accountId },
             secret
         )
     })
}