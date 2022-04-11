import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { FaRegBuilding, FaPlane } from 'react-icons/fa';
import { IoTrainOutline, IoBicycleOutline, IoWalk } from 'react-icons/io5';

import './journey-planner.scss';
import { serverRequester } from '../../http/requesters';
import Loading from '../loading';

import { sampleJourneys } from './sample';

const JOURNEY_OPTIONS = { walk: 'WALK', bike: 'BIKE' };

const DESTINATIONS = {
  werk: {
    name: 'Werk',
    icon: <FaRegBuilding />,
    code: '_WERK',
    coords: [
      process.env.REACT_APP_WORK_COORDS_LAT,
      process.env.REACT_APP_WORK_COORDS_LON,
    ],
  },
  schiphol: { name: 'Schiphol', icon: <FaPlane />, code: 'SHL' },
  amsterdamC: { name: 'Amsterdam C', icon: <IoTrainOutline />, code: 'ASD' },
  amsterdamZ: { name: 'Amsterdam Z', icon: <IoTrainOutline />, code: 'ASDZ' },
  utrechtC: { name: 'Utrecht C', icon: <IoTrainOutline />, code: 'UT' },
  rotterdamC: { name: 'Rotterdam C', icon: <IoTrainOutline />, code: 'RTD' },
  denHaagC: { name: 'Den Haag C', icon: <IoTrainOutline />, code: 'GVC' },
};

function getPrettyStation(station) {
  switch (station) {
    case 'ZD':
      return 'Zaandam';
    case 'ASDM':
      return 'Amsterdam Muiderpoort';
    case 'ASA':
      return 'Amsterdam Amstel';
    case 'ASD':
      return 'Amsterdam Centraal';
    case 'ASDZ':
      return 'Amsterdam Zuid';
    case 'SHL':
      return 'Schiphol Airport';
    case 'GVC':
      return 'Den Haag Centraal';
    case 'RTD':
      return 'Rotterdam Centraal';
    case 'UT':
      return 'Utrecht Centraal';
    case '_WERK':
      return 'Werk';
    default:
      break;
  }
}

const Station = (props) => {
  const { name, icon, handleSet } = props;
  return (
    <div className="pill" onClick={handleSet}>
      {icon}
      <span>{name}</span>
    </div>
  );
};

const Option = ({ selected, handleSet }) => {
  return (
    <div className="toggle">
      <div
        className={cx({ selected: selected === JOURNEY_OPTIONS.walk })}
        onClick={() => handleSet(JOURNEY_OPTIONS.walk)}
      >
        <IoWalk />
      </div>
      <div
        className={cx({ selected: selected === JOURNEY_OPTIONS.bike })}
        onClick={() => handleSet(JOURNEY_OPTIONS.bike)}
      >
        <IoBicycleOutline />
      </div>
    </div>
  );
};

const JourneyPlanner = (props) => {
  const [originType, setOriginType] = useState(JOURNEY_OPTIONS.walk);
  const [destinationType, setDestinationType] = useState(JOURNEY_OPTIONS.walk);
  const [journeyResults, setJourneyResults] = useState(null);
  const [title, setTitle] = useState('Waar gaan we heen?');
  const [destination, setDesination] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!destination) return setTitle('Waar gaan we heen?');
    if (destination) setTitle(`Naar ${getPrettyStation(destination.code)}`);

    const params = {
      originLat: process.env.REACT_APP_HOME_COORDS_LAT,
      originLon: process.env.REACT_APP_HOME_COORDS_LON,
      ...(!destination.coords ? { toStation: destination.code } : {}),
      ...(destination.coords ? { destinationLat: destination.coords[0] } : {}),
      ...(destination.coords ? { destinationLon: destination.coords[1] } : {}),
    };

    setLoading(true);

    // load results
    // serverRequester
    //   .get('/trains/journey', {
    //     params,
    //   })
    //   .then((response) => {
    //     setJourneyResults(response.data);
    //   })
    //   .finally(() => setLoading(false));

    setInterval(() => {
      setLoading(false);
      setJourneyResults(sampleJourneys);
    }, 700);
  }, [destination]);

  return (
    <div className="journey-planner">
      <h1>{title}</h1>
      <h2>Aansluitingsvervoer</h2>
      <div className="journey-options">
        <div>
          <Option
            name="origin"
            selected={originType}
            handleSet={setOriginType}
          />
          <span>Start</span>
        </div>
        <div>
          <Option
            name="destination"
            selected={destinationType}
            handleSet={setDestinationType}
          />
          <span>Eind</span>
        </div>
      </div>
      {destination && loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      {destination && journeyResults && (
        <div className="results">
          {journeyResults.map((result) => {
            return (
              <div className={cx('result', { isRealtime: result.realtime })}>
                <div className="transfers"></div>
                <div className="crowding"></div>
              </div>
            );
          })}
        </div>
      )}
      {!destination && (
        <div className="station-pills">
          {Object.keys(DESTINATIONS).map((destination) => {
            const dest = DESTINATIONS[destination];
            return (
              <Station
                key={dest.code}
                name={dest.name}
                icon={dest.icon}
                handleSet={() => setDesination(dest)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JourneyPlanner;
