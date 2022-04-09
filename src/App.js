import logo from './logo.svg';
import './App.scss';

import { Time } from './components/Time';
import { Nav } from './components/Nav';
import { Lightbar } from './components/Lightbar/Lightbar';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>lighthouse</h1>
          <Time />
        </header>
        <Nav />
        <Lightbar />
      </div>
    </div>
  );
}

export default App;
