import React, { useEffect, useState } from 'react';
import './time.scss';

import moment from 'moment';

export function Time(props) {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="date">
      <div className="current-date">{time.format('ddd D MMM')}</div>
      <div className="current-time">{time.format('HH:mm')}</div>
    </div>
  );
}
