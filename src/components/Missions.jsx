import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { missionsFetchAPI } from '../redux/missions/missionsSlice';
import Mission from './Mission';
import styles from '../css/Missions.module.css';

function Missions() {
  const dispatch = useDispatch();
  const { missions, status } = useSelector((store) => store.missions);

  useEffect(() => {
    if (missions.length > 0) return;
    if (status === 'failed') return;
    dispatch(missionsFetchAPI());
  }, [dispatch]);

  if (status !== 'succeeded') {
    return (
      <section className="center">loading...</section>
    );
  }
  return (
    <section className="center">
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Mission</th>
            <th className={styles.tableHeader}>Description</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}> </th>
          </tr>
        </thead>
        <tbody>
          {
            missions.missions.map((item, i) => (
              <Mission
                key={item.mission_id}
                missionName={item.mission_name}
                description={item.description}
                odd={i % 2 === 0}
              />
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Missions;
