import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { firestore } from '../../firebase';

const secret = process.env.SECRET

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (
        !req.headers?.token ||
        typeof req.headers.token !== "string" ||
        !/Bearer .+/g.test(req.headers.token)
      ) return res.status(400).send('Bad request!');

        let decode;

      try {
           decode = jwt.verify(req.headers.token.slice(7), secret)
      } catch (err) {
        res.status(400);
      }


      const accounts = firestore.collection('accounts')

      const filtered = await accounts
      .where('id', '==', decode.account)
      .get()

      const account = filtered.docs[0]?.data();
      if(!account) return res.status(400)

      const id = filtered.docs[0].id;
      const notes = (await firestore.collection('accounts').doc(id).collection('notes').get()).docs.map(doc => {
          return {
              title: doc.data().title,
              value: doc.data().value,
              id: doc.id
          }
      });
      return res.status(200).json(notes);
}