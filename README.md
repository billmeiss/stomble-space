## API Documentation

### Add a spaceship
#### POST
#### Parameters
- Name (String)
- City (String)
- Planet (String)
- Status (String) - Must be 'Decomissioned', 'Maintenance' or 'Operational'

### Delete a spaceship
#### DELETE
#### Parameters
- Spaceship Id (String)

### Update the status of a spaceship
#### PATCH
#### Parameters
- Spaceship Id (String)
- Status (String) - Must be 'Decomissioned', 'Maintenance' or 'Operational'

### Change the destination of a spacehsip
#### PATCH
#### Parameters
- Spaceship Id (String)
- City (String) - New city of intended arrival
- Planet (String) - New planet of intended arrival

### Add a location
#### POST
#### Parameters
- Capacity (Integer) - Spaceship capacity of location
- City (String)
- Planet (String)

### Remove a location
#### DELETE
#### Parameters
- Location Id (String)

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables
```

Set each variable on `.env`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.
- `MONGODB_DB` - Stomble

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/zeit/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` and `MONGODB_DB` environment variables.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.
