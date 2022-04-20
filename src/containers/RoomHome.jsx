import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchLightingRooms as fetchLightingRoomsAction } from '../store/lighting/actions';

import { getRoomByName, isLoading } from '../store/lighting/selectors';

import './room-home.scss';

const RoomHome = ({ roomName, fetchLightingRooms }) => {
  const isLoadingRooms = useSelector(isLoading);
  const thisRoom = useSelector((state) => getRoomByName(state, roomName));

  useEffect(() => {
    if (!thisRoom && !isLoadingRooms) {
      console.log('what the fuck');
      fetchLightingRooms();
    }
  }, [isLoadingRooms]);

  console.log('thisRoom', thisRoom);
  return <div className="room-home">{thisRoom?.room.friendlyName}</div>;
};

const mapDispatch = (dispatch) => ({
  fetchLightingRooms: () => dispatch(fetchLightingRoomsAction),
});

export default connect(null, mapDispatch)(RoomHome);
