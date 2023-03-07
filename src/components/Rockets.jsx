import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rocketsSlice';
import Rocket from './Rocket';

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
    id, name, type, images, description,
  }) => (
    <Rocket
      key={id}
      name={name}
      type={type}
      image={images[0]}
      description={description}
    />
  ));

  return (
    <section className="center">
      {rocketsList}
    </section>
  );
}

export default Rockets;
