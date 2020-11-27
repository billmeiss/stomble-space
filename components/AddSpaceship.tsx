import { useState } from 'react';

export default function AddSpaceship () {
  const [name, addName] = useState(null);
  const [city, addCity] = useState(null);
  const [planet, addPlanet] = useState(null);
  const [status, addStatus] = useState(null);
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes('');
    const body = {
      name,
      city,
      planet,
      status
    }
    const res = await fetch('/api/spaceships/add', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      setRes('Spaceship details added succesfully');
    }
    if (res.status === 400) {
      setRes('Error adding spaceship details');
    }
  }
  return (
    <>
      <b>Add Spaceship</b>
      <p>{res}</p>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          type="text"
          onChange={e => addName(e.target.value)}
        />
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
        <p>Status</p>
        <input
          type="text"
          onChange={e => addStatus(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
