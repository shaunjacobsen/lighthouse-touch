import React, { useEffect, useState } from 'react';
import moment from 'moment';
import cx from 'classnames';

import './next-trains-widget.scss';
import NSLogo from '../../img/ns.svg';

import NextTrainsLine from './NextTrainsLine';
import { serverRequester } from '../../http/requesters';
import Loading from '../loading';

const NextTrainsWidget = (props) => {
  const { short } = props;
  const [showMinutes, setShowMinutes] = useState(true);
  const [nextTrains, setNextTrains] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      serverRequester
        .get('/trains/departures', { params: { station: 'ZD', limit: 20 } })
        .then((response) => {
          const tenMinutesFromNow = moment().add(9, 'minutes');
          // only get trains that are coming in 10 minutes or later
          let filteredTrains = response.data.filter((train) => {
            return moment(train.actualDateTime).isAfter(tenMinutesFromNow);
          });
          if (short) filteredTrains = filteredTrains.slice(0, 4);
          setNextTrains(filteredTrains);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className={cx('next-trains-widget', { short })}>
      <div className="header">
        <img src={NSLogo} />
        <div>
          <h2>Vertrek</h2>
          <h1>Zaandam</h1>
        </div>
      </div>
      <div className="board">
        {loading && <Loading pad />}
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
