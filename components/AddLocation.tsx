import { useState } from 'react';

export default function AddLocation () {
  const [city, addCity] = useState(null);
  const [planet, addPlanet] = useState(null);
  const [spaceportCap, addSpaceportCap] = useState(null);
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes('');
    const body = {
      city,
      planet,
      spaceportCap
    }
    const res = await fetch('/api/locations/add', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      setRes('Location details added succesfully');
    }
    if (res.status === 400) {
      setRes('Error adding location details');
    }
  }
  return (
    <>
      <b>Add Location</b>
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
        <p>Spaceport Capacity</p>
        <input
          type="text"
          onChange={e => addSpaceportCap(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
