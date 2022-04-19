import React from 'react';
import cx from 'classnames';

import './toggle.scss';

const Toggle = ({ icon, active, onClick }) => {
  return (
    <div onClick={onClick} className={cx('toggle', { active })}>
      <div className="icon">{icon}</div>
    </div>
  );
};

export default Toggle;
