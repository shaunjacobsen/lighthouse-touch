import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon } from 'antd';

export class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zones: [],
      coordinator: '',
      currentTrack: {
        title: '',
        artist: '',
      },
    };
  }

  componentDidMount() {
    this.getZones();
    this.getCurrentTrack();
    this.interval = setInterval(() => this.tick(), 1500);
  }

  tick() {
    this.getZones();
    this.getCurrentTrack();
  }

  getZones = async () => {
    try {
      const req = await axios.get(`${process.env.REACT_APP_BRIDGE_API_HOST}:5005/zones`);
      if (req.status === 200) {
        this.setState(state => ({
          zones: req.data,
          coordinator: req.data[0].coordinator.roomName,
        }));
      }
    } catch (e) {}
  };

  getCurrentTrack() {
    if (this.state.zones.length > 0) {
      const coordinator = this.state.zones[0].coordinator;
      const track = coordinator.state.currentTrack;
      this.setState(state => ({
        currentTrack: track,
      }));
    }
  }

  togglePlayState = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BRIDGE_API_HOST}:5005/${this.state.coordinator}/playpause`);
    } catch (e) {}
  };

  prevTrack = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BRIDGE_API_HOST}:5005/${this.state.coordinator}/previous`);
    } catch (e) {}
  };

  nextTrack = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BRIDGE_API_HOST}:5005/${this.state.coordinator}/next`);
    } catch (e) {}
  };

  incrementDecrementVolume = async amount => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BRIDGE_API_HOST}:5005/${this.state.coordinator}/groupVolume/${amount}`
      );
    } catch (e) {}
  };

  render() {
    return (
      <div>
        <div className="card">
          <div className="meta" style={{ letterSpacing: '2px' }}>
            Playing in <span style={{ fontWeight: '500' }}>{this.state.coordinator}</span>
          </div>
          <div className="image">
            <img
              src={this.state.currentTrack.absoluteAlbumArtUri}
              width="150"
              height="auto"
              alt={this.state.currentTrack.album}
            />
          </div>
          <h1>{this.state.currentTrack.title}</h1>
          <h2>{this.state.currentTrack.artist}</h2>
          <div className="actions">
            <div className="button" onClick={() => this.incrementDecrementVolume('-3')}>
              <Icon type="minus" />
            </div>
            <div className="button" onClick={this.prevTrack}>
              <Icon type="step-backward" />
            </div>
            <div className="button" onClick={this.togglePlayState}>
              <Icon type="caret-right" theme="outlined" />
              <Icon type="pause" theme="outlined" />
            </div>
            <div className="button" onClick={this.nextTrack}>
              <Icon type="step-forward" />
            </div>
            <div className="button" onClick={() => this.incrementDecrementVolume('+3')}>
              <Icon type="plus" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
