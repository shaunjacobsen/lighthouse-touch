import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';

import { IoBulbOutline } from 'react-icons/io5';

import { bridgeRequester } from '../../http/requesters';
import { fetchLightingRooms as fetchLightingRoomsAction } from '../../store/lighting/actions';

import Toggle from '../Toggle';
import Dimmer from './../ui/Dimmer';

import './room-control.scss';

const RoomControl = ({ room, fetchLightingRooms, switchOnly }) => {
  function handleDim(room, value) {
    console.log('handleDim', value, room);

    bridgeRequester
      .post(`/rooms/room/${room.room._id}`, {
        dimming: { brightness: value },
        on: { on: true },
      })
      .finally(() => {
        fetchLightingRooms();
      });
  }

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

  const hasDimmableLights = room.devices.some((d) => !!d.dimming);
  const highestDim = Math.max(
    ...room.devices.map((d) => d.dimming?.brightness),
  );
  const someLightsOn = room.devices.some((d) => !!d.on.on);
  const allLightsOn = room.devices.every((d) => !!d.on.on);

  return (
    <div
      className={cx('room-control', {
        mini: switchOnly,
        'some-on': someLightsOn,
        'all-on': allLightsOn,
      })}
    >
      <div>
        <div className="meta">
          {room.room.friendlyName}
          {!switchOnly && (
            <span>
              {room.devices.filter((d) => !!d.on.on).length}&nbsp;/&nbsp;
              {room.devices.length}
            </span>
          )}
        </div>
        {hasDimmableLights && !switchOnly && (
          <Dimmer
            key={room.room.id}
            value={highestDim}
            active={someLightsOn}
            handleChange={(value) => handleDim(room, value)}
          />
        )}
        <Toggle
          onClick={() => handleSwitch(room)}
          active={allLightsOn}
          indeterminate={someLightsOn}
          icon={<IoBulbOutline />}
        />
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  fetchLightingRooms: () => dispatch(fetchLightingRoomsAction()),
});

export default connect(null, mapDispatch)(RoomControl);
