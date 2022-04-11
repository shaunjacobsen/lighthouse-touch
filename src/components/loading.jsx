import React from 'react';
import cx from 'classnames';

import './loading.scss';

import { ImSpinner8 } from 'react-icons/im';

const Loading = ({ pad }) => {
  return (
    <div className={cx('loading-container', { pad })}>
      <div className="loading">
        <ImSpinner8 />
      </div>
    </div>
  );
};

export default Loading;
