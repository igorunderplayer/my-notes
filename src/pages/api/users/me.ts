import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { firestore } from "../../../firebase";

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
              .where('id', '==', decode.account)
              .get()
        
              const account = filtered.docs[0]?.data();
        
              if(!account) return res.status(400)
        
              return res.status(200).json(account);
            break;

        case 'POST':
            break;

        default:
                res.status(404);
                return;
            break;
    }
}
