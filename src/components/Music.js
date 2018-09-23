import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon } from '../../node_modules/antd';

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
      const req = await axios.get('http://localhost:5005/zones');
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
      await axios.get(`http://localhost:5005/${this.state.coordinator}/playpause`);
    } catch (e) {}
  };

  prevTrack = async () => {
    try {
      await axios.get(
        `http://localhost:5005/${this.state.coordinator}/previous`
      );

    } catch (e) {}
  };

  nextTrack = async () => {
    try {
      await axios.get(`http://localhost:5005/${this.state.coordinator}/next`);
    } catch (e) {}
  };

  incrementDecrementVolume = async amount => {
    try {
      await axios.get(
        `http://localhost:5005/${this.state.coordinator}/groupVolume/${amount}`
      );
    } catch (e) {}
  };

  render() {
    return (
      <div>
        <br />
        <div className="now-playing">
          <div className="room">Playing in {this.state.coordinator}</div>
          <div className="album-art">
            <img
              src={this.state.currentTrack.absoluteAlbumArtUri}
              width="150"
              height="auto"
              alt={this.state.currentTrack.album}
            />
          </div>
          <div className="title">{this.state.currentTrack.title}</div>
          <div className="artist">{this.state.currentTrack.artist}</div>
        </div>
        <Button
          size="large"
          shape="circle"
          onClick={() => this.incrementDecrementVolume('-3')}
          icon="minus"
        />
        &nbsp;
        <Button.Group>
          <Button size="large" onClick={this.prevTrack} icon="step-backward" />
          <Button size="large" onClick={this.togglePlayState}>
            <Icon type="caret-right" theme="outlined" />
            <Icon type="pause" theme="outlined" />
          </Button>
          <Button size="large" onClick={this.nextTrack} icon="step-forward" />
        </Button.Group>
        &nbsp;
        <Button
          size="large"
          shape="circle"
          onClick={() => this.incrementDecrementVolume('+3')}
          icon="plus"
        />
      </div>
    );
  }
}
