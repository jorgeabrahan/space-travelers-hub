/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { cancelRocket, reserveRocket } from '../redux/rockets/rocketsSlice';

const Rocket = ({
  id, name, image, description, reserved,
}) => {
  const dispatch = useDispatch();
  const handleReserve = () => {
    dispatch(reserveRocket(id));
  };
  const handleCancelation = () => {
    dispatch(cancelRocket(id));
  };

  return (
    <div className="rocket">
      <img className="rocket__image" src={image} alt={name} loading="lazy" />
      <div className="rocket__content">
        <h2 className="rocket__title">{ name }</h2>
        <p className="rocket__description">
          {reserved && <span className="rocket__badge">Reserved</span>}
          {description}
        </p>
        {!reserved && (
        <button
          className="rocket__button reserve"
          type="button"
          onClick={handleReserve}
        >
          Reserve Rocket
        </button>
        )}
        {reserved && (
        <button
          className="rocket__button reserved"
          type="button"
          onClick={handleCancelation}
        >
          Cancel Reservation
        </button>
        )}
      </div>
    </div>
  );
};

Rocket.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default Rocket;
