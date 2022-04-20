import React from 'react';
import cx from 'classnames';

import './toggle.scss';

const Toggle = ({ icon, active, indeterminate, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cx('toggle', { active: active || indeterminate })}
    >
      <div className="icon">{icon}</div>
    </div>
  );
};

export default Toggle;
