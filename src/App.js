import React, { Component } from 'react';
import './style/styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="top-bar">
            <div className="time">16:11</div>
            <div className="brand">Lighthouse</div>
            <div className="info">Loading</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
