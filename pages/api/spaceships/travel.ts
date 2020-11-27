import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import { connectToDatabase } from '../../../util/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const {
    shipId,
    city,
    planet
  } = req.body;

  try {
    const id: ObjectID = new ObjectID(shipId);

    const shipDetails = await db
      .collection('spaceships')
      .find({
        _id: id
      })
      .project({
        location: 1,
        status: 1
      })
      .toArray();

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

    if (shipDetails[0].status !== 'operational') {
      return res.status(400).send('Ship is not operational')
    }

    if (
      spaceShipLimit[0].ships < spaceShipLimit[0].spaceportCap
    ) {
      await db
        .collection('locations')
        .updateOne({
          city: shipDetails[0].location.city,
          planet: shipDetails[0].location.planet
        }, {
          $inc: {
            ships: -1
          }
        });

      const updateSpaceship = await db
        .collection('spaceships')
        .updateOne({
          _id: id
        }, {
          $set: {
            location: {
              city: city,
              planet: planet
            }
          }
        });

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
      res.status(200).send(updateSpaceship);
    } else {
      res.status(400).send('Location is full');
    }
  } catch (e) {
    res.status(404).send(e)
    console.log(e)
  }
}
