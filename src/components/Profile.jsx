import { useSelector } from 'react-redux';
import '../css/Profile.css';

function Profile() {
  const { rockets } = useSelector((store) => store.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const reservedRocketsList = reservedRockets.map((rocket) => (
    <p key={rocket.id} className="reserved__item">{rocket.name}</p>
  ));

  return (
    <section className="center profile">
      <div>
        {/* this is the missions column where you can add the list of reserved ones */}
        <p className="reserved__message">You have no missions added!</p>
      </div>
      <div>
        {reservedRocketsList.length > 0 && (
        <>
          <h2 className="reserved__title">My Rockets</h2>
          <div className="reserved__list">
            {reservedRocketsList}
          </div>
        </>
        )}
        {reservedRocketsList.length === 0 && (
        <p className="reserved__message">You have no rockets reserved!</p>
        )}
      </div>
    </section>
  );
}

export default Profile;
