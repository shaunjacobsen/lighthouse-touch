import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import './dimmer.scss';
import { IoBulbOutline } from 'react-icons/io5';

const Dimmer = ({ value, active, handleChange }) => {
  const sliderDiv = useRef(null);

  const [percentage, setPercentage] = useState(value);

  function calculatePercentage(e) {
    const pixelOffset =
      e.offsetX || e.nativeEvent?.offsetX || e.targetTouches[0].pageX;
    const width = sliderDiv.current.offsetWidth;
    return (pixelOffset / width) * 100;
  }

  function handleTouch(e) {
    const _percentage = calculatePercentage(e);
    setPercentage(_percentage);
  }

  function handleTouchEnd(e) {
    handleTouch(e);
    const pct = calculatePercentage(e);
    handleChange(pct);
  }

  function setMax() {
    handleChange(100.0);
    setPercentage(100);
  }

  useEffect(() => {
    sliderDiv.current.addEventListener('mousedown', handleTouch, false);
    sliderDiv.current.addEventListener('touchstart', handleTouch, false);
    sliderDiv.current.addEventListener('mouseup', handleTouchEnd, false);
    sliderDiv.current.addEventListener('touchEnd', handleTouchEnd, false);
  }, []);

  return (
    <div className="dimmer-container">
      <div className="dimmer" ref={sliderDiv}>
        <div
          className={cx('slider', { active })}
          style={{ width: `${percentage}%` }}
        >
          &nbsp;
        </div>
      </div>
      <div className="max" onClick={setMax}>
        +
      </div>
    </div>
  );
};

export default Dimmer;
