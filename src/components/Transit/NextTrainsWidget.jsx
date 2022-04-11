import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './next-trains-widget.scss';
import NSLogo from '../../img/ns.svg';

import NextTrainsLine from './NextTrainsLine';
import { serverRequester } from '../../http/requesters';

const NextTrainsWidget = (props) => {
  const [showMinutes, setShowMinutes] = useState(true);
  const [nextTrains, setNextTrains] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMinutes((current) => !current);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!process.env.NODE_ENV === 'development') {
      // fetch trains
      serverRequester
        .get('/trains/departures', { params: { station: 'ZD', limit: 8 } })
        .then((response) => {
          setNextTrains(response.data);
        });
    }
  }, []);

  return (
    <div className="next-trains-widget">
      <div className="header">
        <img src={NSLogo} />
        <div>
          <h2>Vertrek</h2>
          <h1>Zaandam</h1>
        </div>
      </div>
      <div className="board">
        {nextTrains.map((t) => (
          <NextTrainsLine
            showMinutes={showMinutes}
            type={t.product?.categoryCode}
            number={t.product?.number}
            destination={t.direction}
            arrival={t.actualDateTime}
          />
        ))}
      </div>
    </div>
  );
};

export default NextTrainsWidget;