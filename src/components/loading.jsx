import React from 'react';
import './loading.scss';

import {ImSpinner8} from 'react-icons/im'

const Loading = props => {
  return <div className="loading">
    <ImSpinner8 />
  </div>
}

export default Loading;