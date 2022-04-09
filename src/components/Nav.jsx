import React from 'react';

import {
  IoHomeOutline,
  IoBulbOutline,
  IoMusicalNotesOutline,
  IoTrainOutline,
} from 'react-icons/io5';
import { WiDayCloudy } from 'react-icons/wi';

export function Nav(props) {
  return (
    <nav>
      <ul>
        <li className="active">
          <IoHomeOutline />
          <div>Home</div>
        </li>
        <li>
          <IoBulbOutline />
          <div>Lighting</div>
        </li>
        <li>
          <IoMusicalNotesOutline />
          <div>Music</div>
        </li>
        <li>
          <IoTrainOutline />
          <div>Transit</div>
        </li>
        <li>
          <WiDayCloudy />
          <div>Weather</div>
        </li>
      </ul>
    </nav>
  );
}
