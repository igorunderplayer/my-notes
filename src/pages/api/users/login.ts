import { NextApiRequest, NextApiResponse } from 'next';
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
    .where('password', '==', password)
    .get()

    const accountId = filtered.docs[0]?.id

    if(!accountId) return res.status(404).json({ message: 'Account not found!' })
     return res.status(200).json({
         token: jwt.sign(
             { account: accountId },
             secret
         )
     })
}