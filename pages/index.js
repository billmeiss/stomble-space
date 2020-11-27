import AddSpaceship from '../components/AddSpaceship';
import UpdateSpaceship from '../components/UpdateSpaceship';
import DeleteSpaceship from '../components/DeleteSpaceship';
import AddLocation from '../components/AddLocation';
import DeleteLocation from '../components/DeleteLocation';
import AddTravel from '../components/AddTravel';

export default function Home () {
  return (
    <>
      <AddSpaceship />
      <br />
      <UpdateSpaceship />
      <br />
      <DeleteSpaceship />
      <br />
      <AddLocation />
      <br />
      <DeleteLocation />
      <br />
      <AddTravel />
    </>
  );
}
