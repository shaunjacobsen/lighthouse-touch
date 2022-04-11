import React, { useEffect } from 'react';
import './lightbar.scss';

import {LightbarGroup} from './LightbarGroup'

export function Lightbar(props) {
  const rooms = [];

  function handleToggleLightGroup(group) {
    // handle network request and setting the state
  }

  useEffect(() => {
    // refresh redux store to get the state of all lighting
  }, [])

  return <div className="lightbar">
    <LightbarGroup slim roomName="Aan" />
    <LightbarGroup slim roomName="Uit" />
    <LightbarGroup roomName="Woonkamer" active />
    <LightbarGroup roomName="Eetkamer" />
    <LightbarGroup roomName="Keuken" active />
    <LightbarGroup roomName="Badkamer" />
    <LightbarGroup roomName="Slaapkamer" />
    <LightbarGroup roomName="Hal" />
    <LightbarGroup roomName="Tuin" />
  </div>
}