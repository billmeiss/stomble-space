import { useState } from 'react';

export default function UpdateSpaceship () {
  const [id, addId] = useState(null);
  const [status, addStatus] = useState(null);
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes('');
    const body = {
      shipId: id,
      status
    }
    const res = await fetch('/api/spaceships/status', {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      setRes('Spaceship status updated succesfully');
    }
    if (res.status === 400) {
      setRes('Error updating spaceship details');
    }
  }
  return (
    <>
      <b>Update Spaceship Status</b>
      <p>{res}</p>
      <form onSubmit={handleSubmit}>
        <p>Spaceship ID</p>
        <input
          type="text"
          onChange={e => addId(e.target.value)}
        />
        <p>New Status</p>
        <input
          type="text"
          onChange={e => addStatus(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
