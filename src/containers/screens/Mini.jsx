import { Time } from './../../components/Time';
import { Nav } from './../../components/Nav';
import WeatherNavWidget from './../../components/Weather/WeatherNavWidget';

import './mini.scss';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLightingRooms, isLoading } from '../../store/lighting/selectors';
import { fetchLightingRooms } from '../../store/lighting/actions';
import { useEffect } from 'react';

function Mini({ roomName }) {
  const isLoadingRooms = useSelector(isLoading);
  const rooms = useSelector(getLightingRooms);
  const thisRoom = rooms?.filter((r) => r.room.friendlyName === roomName)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    if (!rooms?.length && !isLoadingRooms) {
      dispatch(fetchLightingRooms());
    }
  }, [rooms, isLoadingRooms]);

  return (
    <div className="mini">
      <div className="container">
        <header>
          <Time />
          <div className="room">{thisRoom?.room?.friendlyName}</div>
          <WeatherNavWidget />
        </header>
        <div className="main-body">
          <main>
            <Outlet />
          </main>
        </div>
        {/* <Lightbar /> */}
      </div>
    </div>
  );
}

export default Mini;
