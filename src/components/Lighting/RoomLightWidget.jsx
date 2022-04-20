import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { fetchLightingRooms as fetchLightingRoomsAction } from '../../store/lighting/actions';
import { getLightingRooms } from '../../store/lighting/selectors';

import './room-light-widget.scss';
import RoomControl from './RoomControl';

const RoomLightWidget = ({ fetchLightingRooms }) => {
  useEffect(() => {
    fetchLightingRooms();
  }, []);

  const lightingRooms = useSelector(getLightingRooms);

  return (
    <div className="rooms">
      {lightingRooms?.map((room) => {
        return <RoomControl room={room} key={room.room._id} />;
      })}
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  fetchLightingRooms: () => dispatch(fetchLightingRoomsAction()),
});

export default connect(null, mapDispatch)(RoomLightWidget);
