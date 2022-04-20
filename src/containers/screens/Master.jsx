import { Time } from './../../components/Time';
import { Nav } from './../../components/Nav';
import WeatherNavWidget from './../../components/Weather/WeatherNavWidget';

import './master.scss';
import { Outlet } from 'react-router-dom';

function Master({ children }) {
  return (
    <div className="master">
      <div className="container">
        <header>
          <div className="bg">&nbsp;</div>
          <h1>
            light<span>house</span>
          </h1>
          <Time />
          <WeatherNavWidget />
          <Nav />
        </header>
        <div className="main-body">
          <main><Outlet /></main>
        </div>
        {/* <Lightbar /> */}
      </div>
    </div>
  );
}

export default Master;
