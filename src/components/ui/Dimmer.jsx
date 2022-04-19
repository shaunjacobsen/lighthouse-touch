import React from 'react';
import cx from 'classnames';

import './dimmer.scss';

const Dimmer = ({ icon, active, onClick }) => {
  return (
    <div onClick={onClick} className={cx('toggle', { active })}>
      <div className="icon">{icon}</div>
    </div>
  );
};

export default Dimmer;
