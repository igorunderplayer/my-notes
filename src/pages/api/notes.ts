import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { firestore } from '../../firebase';

const secret = process.env.SECRET

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
        await getNotes(req, res);
        break;

    case 'POST':
        await createNote(req, res);
        break;

    default:
      res.status(404)
      return;
  }
}


async function getNotes (req: NextApiRequest, res: NextApiResponse) {
  if (
    !req.headers?.token || typeof req.headers.token !== "string"
  ) return res.status(400).send('Bad request!');

    let decode;

  try {
      decode = jwt.verify(req.headers.token, secret)
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

async function createNote(req: NextApiRequest, res: NextApiResponse) {
    const title = req.body.title
    const value = req.body.value;

    if(!title || !value) {
      res.status(400)
      return;
    }

    if (
      !req.headers?.token || typeof req.headers.token !== "string"
        ) return res.status(400).send('Bad request!');

      let decode;

    try {
         decode = jwt.verify(req.headers.token, secret)
    } catch (err) {
      res.status(400);
    }

    const accounts = firestore.collection('accounts')

    const snapshot = await accounts
    .where('id', '==', decode.account)
    .get()

    if(snapshot.empty) return res.status(400);

    const id = snapshot.docs[0].id;

    const note = {
      title,
      value
    }

    await accounts.doc(id).collection('notes').add(note)

    res.status(200).json({ note })
}