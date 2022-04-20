import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import RoomControl from '../components/Lighting/RoomControl';
import NextTrainsWidget from '../components/Transit/NextTrainsWidget';
import WeatherOverview from '../components/Weather/WeatherOverview';

import { getLightingRooms } from '../store/lighting/selectors';
import { fetchLightingRooms as fetchLightingRoomsAction } from '../store/lighting/actions';

import './home.scss';

export const Home = ({ fetchLightingRooms }) => {
  const rooms = useSelector(getLightingRooms);

  useEffect(() => {
    fetchLightingRooms();
  }, []);

  return (
    <div className="home-container">
      <NextTrainsWidget short />
      <WeatherOverview />
      {rooms?.map((room) => (
        <RoomControl room={room} switchOnly />
      ))}
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  fetchLightingRooms: () => dispatch(fetchLightingRoomsAction()),
});

export default connect(null, mapDispatch)(Home);
