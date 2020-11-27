import { useState } from 'react';

export default function DeleteLocation() {
  const [id, addId] = useState(null);
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes('');
    const body = {
      locationId: id
    }
    const res = await fetch('/api/locations/remove', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      setRes('Location deleted succesfully');
    }
    if (res.status === 400) {
      setRes('Error deleting location');
    }
  }
  return (
    <>
      <b>Delete Location</b>
      <p>{res}</p>
      <form onSubmit={handleSubmit}>
        <p>Location ID</p>
        <input 
          type="text"
          onChange={e => addId(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
