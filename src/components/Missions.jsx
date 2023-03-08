import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { missionsFetchAPI } from '../redux/missions/missionsSlice';

function Missions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(missionsFetchAPI());
  }, []);

  return (
    <section className="center"> </section>
  );
}

export default Missions;
