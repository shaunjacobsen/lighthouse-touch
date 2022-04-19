import './App.scss';

import { Time } from './components/Time';
import { Nav } from './components/Nav';
import { Lightbar } from './components/Lightbar/Lightbar';
import WeatherNavWidget from './components/Weather/WeatherNavWidget';

function App({ children }) {
  return (
    <div className="App">
      <div className="container">
        <header>
          <div className='bg'>&nbsp;</div>
          <h1>light<span>house</span></h1>
          <Time />
          <WeatherNavWidget />
          <Nav />
        </header>
        <div className="main-body">
          <main>{children}</main>
        </div>
        {/* <Lightbar /> */}
      </div>
    </div>
  );
}

export default App;
