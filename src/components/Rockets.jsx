import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rocketsSlice';

function Rockets() {
  const dispatch = useDispatch();
  const { rockets, status } = useSelector((store) => store.rockets);
  useEffect(() => {
    /* Validation to fetch data just when the page loads */
    if (rockets.length > 0) return;
    if (status === 'failed') return;
    dispatch(fetchRockets());
  }, [dispatch]);

  return (
    <section className="center">
      <div>
        <img src="" alt="falcon 1" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, perspiciatis explicabo.
          Non saepe, eaque ea eos harum mollitia minima magnam.
        </p>
        <button type="button">Reserve Rocket</button>
      </div>
    </section>
  );
}

export default Rockets;
