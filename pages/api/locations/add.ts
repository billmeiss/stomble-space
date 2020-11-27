import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../util/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const {
    city,
    planet,
    spaceportCap
  } = req.body;

  if (!city || !planet || !spaceportCap) return res.status(400).send('Please provide all fields');

  const locationDetails = {
    city,
    planet,
    spaceportCap,
    ships: 0
  }

  try {
    const addLocation = await db
      .collection('locations')
      .insertOne(locationDetails);

    res.status(200).send(addLocation)
  } catch (e) {
    res.status(404).send(e)
  }
}
