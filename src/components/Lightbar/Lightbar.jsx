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
    <LightbarGroup roomName="Woonkamer" active />
    <LightbarGroup roomName="Slaapkamer" />
    <LightbarGroup roomName="Keuken" active />
    <LightbarGroup roomName="Badkamer" />
    <LightbarGroup roomName="Hal" />
    <LightbarGroup roomName="Eetkamer" />
  </div>
}