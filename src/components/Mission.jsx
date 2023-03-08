import PropTypes from 'prop-types';
import styles from '../css/Missions.module.css';

function Mission({ missionName, description, odd }) {
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
          odd ? (
            <button className={styles.onMission} type="button">Leave Mission</button>
          ) : (
            <button className={styles.outMission} type="button">Join Mission</button>
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
};

export default Mission;
