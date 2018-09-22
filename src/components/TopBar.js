import React, { Component } from 'react';
import moment from 'moment';

export class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: moment(),
    };
  }

  tick() {
    this.setState(state => ({
      time: moment(),
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  render() {
    return (
      <div className="top-bar">
        <div className="datetime">
          <div className="time">{this.state.time.format('HH:mm')}</div>
          <div className="date">{this.state.time.format('ddd D MMM')}</div>
        </div>
        <div className="brand">Lighthouse</div>
        <div className="info">Loading</div>
      </div>
    );
  }
}
