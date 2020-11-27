import { useState } from 'react';

export default function DeleteSpaceship () {
  const [id, addId] = useState(null);
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes('');
    const body = {
      shipId: id
    }
    const res = await fetch('/api/spaceships/remove', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      setRes('Spaceship deleted succesfully');
    }
    if (res.status === 400) {
      setRes('Error deleting spaceship');
    }
  }
  return (
    <>
      <b>Delete Spaceship</b>
      <p>{res}</p>
      <form onSubmit={handleSubmit}>
        <p>Spaceship ID</p>
        <input
          type="text"
          onChange={e => addId(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
