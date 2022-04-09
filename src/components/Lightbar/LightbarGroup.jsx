import React from 'react';
import './lightbar.scss';
import cx from 'classnames';

import { IoBulbOutline } from 'react-icons/io5';

export function LightbarGroup(props) {
  const { active, roomName } = props;
  return (
    <div className="lightbar-group">
      <div className={cx('indicator', { active })}>
        <IoBulbOutline />
      </div>
      <div className="room-name">{roomName}</div>
    </div>
  );
}
