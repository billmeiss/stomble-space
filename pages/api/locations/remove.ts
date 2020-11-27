import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import { connectToDatabase } from '../../../util/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const {
    locationId
  } = req.body;

  const id: ObjectID = new ObjectID(locationId);

  try {
    const deleteStatus = await db
      .collection('locations')
      .deleteOne({ _id: id });

    res.status(200).send(deleteStatus);
  } catch (e) {
    res.status(404).send(e);
  }
}
