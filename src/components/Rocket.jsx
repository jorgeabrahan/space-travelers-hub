/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

function capitalizeFirst(word) {
  return ` ${word[0].toUpperCase()}${word.slice(1, word.length)}`;
}

const Rocket = ({
  name, type, image, description,
}) => (
  <div>
    <img src={image} alt={name} />
    <p>
      {description}
    </p>
    <button type="button">
      Reserve
      {capitalizeFirst(type)}
    </button>
  </div>
);

Rocket.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Rocket;
