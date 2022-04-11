import './App.scss';

import { Time } from './components/Time';
import { Nav } from './components/Nav';
import { Lightbar } from './components/Lightbar/Lightbar';

function App({ children }) {
  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>lighthouse</h1>
          <Time />
        </header>
        <div className="main-body">
          <Nav />
          <main>{children}</main>
        </div>
        <Lightbar />
      </div>
    </div>
  );
}

export default App;
