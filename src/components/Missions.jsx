import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { missionsFetchAPI } from '../redux/missions/missionsSlice';

function Missions() {
  const dispatch = useDispatch();
  const { missions, status } = useSelector((store) => store.missions);
  useEffect(() => {
    if (missions.length > 0) return;
    if (status === 'failed') return;
    dispatch(missionsFetchAPI());
  }, [dispatch]);

  return (
    <section className="center"> </section>
  );
}

export default Missions;
