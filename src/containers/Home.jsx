import React from 'react';
import NextTrainsWidget from '../components/Transit/NextTrainsWidget';
import WeatherOverview from '../components/Weather/WeatherOverview';

import './home.scss'

export const Home = (props) => {
  return (
    <div className="home-container">
      <NextTrainsWidget short />
      <WeatherOverview />
    </div>
  );
};

export default Home;
