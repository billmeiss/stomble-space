import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../util/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const {
    name,
    city,
    planet,
    status
  } = req.body;

  if (!city || !planet || !name || !status) return res.status(400).send('Please provide all fields');

  const shipDetails = {
    name,
    location: {
      city,
      planet
    },
    status
  }

  try {
    const spaceShipLimit = await db
      .collection('locations')
      .find({
        city,
        planet
      })
      .project({
        spaceportCap: 1,
        ships: 1
      })
      .toArray();

    console.log(spaceShipLimit)

    if (spaceShipLimit[0].ships < spaceShipLimit[0].spaceportCap) {
      const addedSpaceship = await db
        .collection('spaceships')
        .insertOne(shipDetails);

      await db
        .collection('locations')
        .updateOne({
          city,
          planet

        }, {
          $inc: {
            ships: 1
          }
        });
      res.status(200).send(addedSpaceship);
    } else {
      res.status(400).send('Location is full');
    }
  } catch (e) {
    res.status(404).send(e)
    console.log(e)
  }
}
