import React from 'react';
import cx from 'classnames';

import './increment-decrement.scss';

const IncrementDecrement = ({ active, figure, onDecrease, onIncrease }) => {
  return (
    <div className={cx('increment-decrement', { active })}>
      <div onClick={onDecrease} className="button">
        &minus;
      </div>
      <div className="current-figure">{figure}</div>
      <div onClick={onIncrease} className="button">
        +
      </div>
    </div>
  );
};

export default IncrementDecrement;
