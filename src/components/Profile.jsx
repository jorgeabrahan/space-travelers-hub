import { useSelector } from 'react-redux';
import '../css/Profile.css';

function Profile() {
  const { rockets } = useSelector((store) => store.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const reservedRocketsList = reservedRockets.map((rocket) => (
    <p key={rocket.id} className="reserved__item">{rocket.name}</p>
  ));

  const { missions } = useSelector((store) => store.missions);
  const reservedMissions = missions.filter((mission) => mission.reserved);
  const reservedMissionsList = reservedMissions.map((mission) => (
    <p key={mission.mission_id} className="reserved__item">{mission.mission_name}</p>
  ));
  return (
    <section className="center profile">
      <div>
        {reservedMissionsList.length > 0 && (
        <>
          <h2 className="reserved__title">My Missions</h2>
          <div className="reserved__list">
            {reservedMissionsList}
          </div>
        </>
        )}
        {reservedMissionsList.length === 0 && (
        <p className="reserved__message">You have no missions reserved!</p>
        )}
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
