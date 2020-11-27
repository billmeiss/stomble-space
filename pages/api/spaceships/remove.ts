import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import { connectToDatabase } from '../../../util/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const {
    shipId
  } = req.body;

  const id: ObjectID = new ObjectID(shipId);

  try {
    const deleteStatus = await db
      .collection('spaceships')
      .deleteOne({ _id: id });

    res.status(200).send(deleteStatus);
  } catch (e) {
    res.status(404).send(e);
  }
}
