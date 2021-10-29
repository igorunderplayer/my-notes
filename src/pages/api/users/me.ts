import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebase";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import firebase from 'firebase'

const secret = process.env.SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (
                !req.headers?.token || typeof req.headers.token !== "string") return res.status(400).send('Bad request!');

                let decode;

              try {
                   decode = jwt.verify(req.headers.token, secret)
                   if(!decode) {
                       res.status(400)
                       return;
                   }
              } catch (err) {
                res.status(400);
              }
        
        
              const accounts = firestore.collection('accounts')
        
              const filtered = await accounts
              .where(firebase.firestore.FieldPath.documentId(), '==', decode.account)
              .get()
        
              const account = filtered.docs[0]?.data();
        
              if(!account) return res.status(400)
        
              return res.status(200).json(account);
            break;

        case 'POST':
              await createAccount(req, res);
            break;

        default:
                res.status(404);
                return;
            break;
    }
}

async function createAccount(req: NextApiRequest, res: NextApiResponse) {
    const username = req.body.username;
    const passwordString = req.body.password;

    if(!username || !passwordString) {
        res.status(400);
        return;
    }

    const accountsRef = firestore.collection('accounts')

    const filtered = await accountsRef
    .where('username', '==', username)
    .get()

    if(filtered.docs[0]?.data()) {
        res.status(400).json({ message: 'account.exists' })
        return;
    }

    const salt = await bcrypt.genSalt(13)
    const password = await bcrypt.hash(passwordString, salt)

    const doc = await accountsRef.add({
        username,
        password
    })

    res.status(200).json({
        message: 'Account created!'
    })
}
