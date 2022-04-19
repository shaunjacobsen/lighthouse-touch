import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import cx from 'classnames';
import Dimmer from './../ui/Dimmer';

import { fetchLightingRooms as fetchLightingRoomsAction } from '../../store/lighting/actions';
import { getLightingRooms } from '../../store/lighting/selectors';

import './room-light-widget.scss';
import { IoBulbOutline } from 'react-icons/io5';
import { bridgeRequester } from '../../http/requesters';
import Toggle from '../Toggle';
import IncrementDecrement from '../ui/IncrementDecrement';

const RoomLightWidget = ({ fetchLightingRooms }) => {
  useEffect(() => {
    fetchLightingRooms();
  }, []);

  const lightingRooms = useSelector(getLightingRooms);

  function handleSwitch(room) {
    let mode = false;
    if (room.devices.some((d) => !!d.on.on)) {
      mode = true;
    }
    if (room.devices.every((d) => !!d.on.on)) {
      mode = false;
    } else {
      mode = true;
    }

    bridgeRequester
      .post(`/rooms/room/${room.room._id}`, { on: { on: mode } })
      .finally(() => {
        fetchLightingRooms();
      });
  }

  function handleDim(room, value) {
    // const highestDim = Math.max(
    //   ...room.devices.map((d) => d.dimming?.brightness),
    // );

    // const brightness = highestDim + increment;

    bridgeRequester
      .post(`/rooms/room/${room.room._id}`, {
        dimming: { brightness: value },
      })
      .finally(() => {
        fetchLightingRooms();
      });
  }

  return (
    <div className="rooms">
      {lightingRooms?.map((room) => {
        const hasDimmableLights = room.devices.some((d) => !!d.dimming);
        const highestDim = Math.max(
          ...room.devices.map((d) => d.dimming?.brightness),
        );
        const someLightsOn = room.devices.some((d) => !!d.on.on);
        const allLightsOn = room.devices.every((d) => !!d.on.on);
        return (
          <div
            className={cx('room', {
              'some-on': someLightsOn,
              'all-on': allLightsOn,
            })}
          >
            <div>
              <div className="meta">
                {room.room.friendlyName}
                <span>
                  {room.devices.filter((d) => !!d.on.on).length}&nbsp;/&nbsp;
                  {room.devices.length}
                </span>
              </div>
              {hasDimmableLights && (
                // <IncrementDecrement
                //   figure={Math.round(Math.max(
                //     ...room.devices.map((d) => d.dimming?.brightness),
                //   ))}
                //   onDecrease={() => handleDim(room, -4.95)}
                //   onIncrease={() => handleDim(room, 4.95)}
                // />
                <div className="dimmer">
                  
                </div>
              )}
              <Toggle
                onClick={() => handleSwitch(room)}
                active={allLightsOn}
                icon={<IoBulbOutline />}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  fetchLightingRooms: () => dispatch(fetchLightingRoomsAction()),
});

export default connect(null, mapDispatch)(RoomLightWidget);
