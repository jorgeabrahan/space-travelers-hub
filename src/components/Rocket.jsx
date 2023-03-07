/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

function capitalizeFirst(word) {
  return ` ${word[0].toUpperCase()}${word.slice(1, word.length)}`;
}

const Rocket = ({
  name, type, image, description,
}) => (
  <div className="rocket">
    <img className="rocket__image" src={image} alt={name} />
    <div className="rocket__content">
      <h2 className="rocket__title">{ name }</h2>
      <p className="rocket__description">
        {description}
      </p>
      <button className="rocket__button" type="button">
        Reserve
        {capitalizeFirst(type)}
      </button>
    </div>
  </div>
);

Rocket.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Rocket;
