import { useState } from 'react';

export default function AddLocation () {
  const [city, addCity] = useState(null);
  const [planet, addPlanet] = useState(null);
  const [shipId, addShipId] = useState(null);
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes('');
    const body = {
      city,
      planet,
      shipId
    }
    const res = await fetch('/api/spaceships/travel', {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      setRes('Travel details added succesfully');
    }
    if (res.status === 400) {
      setRes('Error adding travel details');
    }
  }
  return (
    <>
      <b>Add Travel Details</b>
      <p>{res}</p>
      <form onSubmit={handleSubmit}>
        <p>City</p>
        <input
          type="text"
          onChange={e => addCity(e.target.value)}
        />
        <p>Planet</p>
        <input
          type="text"
          onChange={e => addPlanet(e.target.value)}
        />
        <p>Ship Id</p>
        <input
          type="text"
          onChange={e => addShipId(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
