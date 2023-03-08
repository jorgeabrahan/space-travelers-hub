import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from '../css/Missions.module.css';
import { bookMission, leaveMission } from '../redux/missions/missionsSlice';

function Mission(
  {
    missionId,
    missionName,
    description,
    odd,
    reserved,
  },
) {
  const dispatch = useDispatch();
  return (
    <tr className={odd ? styles.tableOdd : styles.tableEven}>
      <td className={styles.tableMissionName}>{missionName}</td>
      <td className={styles.tableMissionDescription}>{description}</td>
      <td className={styles.tableStatus}>
        {
          odd ? (
            <div className={styles.notAMember}>not a member</div>
          ) : (
            <div className={styles.member}>active member</div>
          )
        }
      </td>
      <td className={styles.tableJoin}>
        {
          reserved ? (
            <button
              className={styles.onMission}
              type="button"
              onClick={() => { dispatch(leaveMission(missionId)); }}
            >
              Leave Mission
            </button>
          ) : (
            <button
              className={styles.outMission}
              type="button"
              onClick={() => { dispatch(bookMission(missionId)); }}
            >
              Join Mission
            </button>
          )
        }
      </td>
    </tr>
  );
}

Mission.propTypes = {
  missionName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  odd: PropTypes.bool.isRequired,
  reserved: PropTypes.bool.isRequired,
  missionId: PropTypes.string.isRequired,
};

export default Mission;
