import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import { connectToDatabase } from '../../../util/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const {
    shipId,
    status
  } = req.body;

  const id: ObjectID = new ObjectID(shipId);

  try {
    const updatedStatus = await db
      .collection('spaceships')
      .updateOne({ _id: id }, {
        $set: {
          status
        }
      });

    res.status(200).send(updatedStatus);
  } catch (e) {
    res.status(404).send(e);
  }
}
