import React from 'react';
import './lightbar.scss';
import cx from 'classnames';

import { IoBulbOutline } from 'react-icons/io5';

export function LightbarGroup(props) {
  const { active, roomName, slim } = props;
  return (
    <div className={cx('lightbar-group', { slim })}>
      <div className={cx('indicator', { active })}>
        <IoBulbOutline />
      </div>
      <div className="room-name">{roomName}</div>
    </div>
  );
}
