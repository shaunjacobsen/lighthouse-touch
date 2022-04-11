import React from 'react';
import JourneyPlanner from '../components/Transit/JourneyPlanner';
import NextTrainsWidget from '../components/Transit/NextTrainsWidget';

import './transit.scss'

export const Transit = (props) => {
  return <div className="transit
  ">
    <NextTrainsWidget />
    <JourneyPlanner />
  </div>;
};

export default Transit;