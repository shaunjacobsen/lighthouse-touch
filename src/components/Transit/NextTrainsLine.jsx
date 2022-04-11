import moment from 'moment';
import React from 'react';

const NextTrainsLine = (props) => {
  const { type, number, destination, arrival, showMinutes } = props;
  
  const arrivalMoment = moment(arrival);

  return (
    <div className="departure">
      <div className="train-meta">
        <div className="train-type">{type}</div>
        <div className="train-no">{number}</div>
      </div>
      <div className="train-info">
        <div className="train-destination">{destination}</div>
        {/* <div className="notes">Rijdt niet naar Utrecht C</div> */}
      </div>
      <div className="train-arrival">
        {showMinutes % 2 === 0 ? (
          <div className="minutes">
            <span>{Math.floor(arrivalMoment.diff(moment()) / 1000 / 60)}</span> min
          </div>
        ) : (
          <div className="time">{arrivalMoment.format('HH:mm')}</div>
        )}
      </div>
    </div>
  );
};

export default NextTrainsLine;
