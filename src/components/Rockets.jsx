import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rocketsSlice';
import Rocket from './Rocket';
import '../css/Rockets.css';

function Rockets() {
  const dispatch = useDispatch();
  const { rockets, status } = useSelector((store) => store.rockets);
  useEffect(() => {
    /* Validation to fetch data just when the page loads */
    if (rockets.length > 0) return;
    if (status === 'failed') return;
    dispatch(fetchRockets());
  }, [dispatch]);

  const rocketsList = rockets.map(({
    id, name, images, description, reserved,
  }) => (
    <Rocket
      key={id}
      id={id}
      name={name}
      image={images[0]}
      description={description}
      reserved={reserved}
    />
  ));

  return (
    <section className="center rockets" data-testid="rockets">
      {status === 'succeeded' ? rocketsList : <p>Loading...</p>}
    </section>
  );
}

export default Rockets;
