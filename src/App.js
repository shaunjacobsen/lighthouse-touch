import React, { Component } from 'react';
import './style/styles.css';
import { TopBar } from './components/TopBar';
import { Main } from './components/Main';
import { Music } from './components/Music';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <TopBar />
          <Music />
        </div>
      </div>
    );
  }
}

export default App;
