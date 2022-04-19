import React from 'react';

import RoomLightWidget from '../components/Lighting/RoomLightWidget';

import './lighting.scss';

const Lighting = (props) => {
  return <div className="lighting-container"><RoomLightWidget /></div>;
};

export default Lighting;