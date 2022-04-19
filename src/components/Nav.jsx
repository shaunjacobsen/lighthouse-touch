import React from 'react';
import { NavLink, BrowserRouter, useLocation } from 'react-router-dom';
import cx from 'classnames';

import {
  IoHomeOutline,
  IoBulbOutline,
  IoMusicalNotesOutline,
  IoTrainOutline,
  IoLeafOutline,
} from 'react-icons/io5';
import { WiDayCloudy } from 'react-icons/wi';

const navigation = [
  { link: '/', name: 'Home', icon: <IoHomeOutline /> },
  { link: '/lighting', name: 'Lighting', icon: <IoBulbOutline /> },
  { link: '/energy', name: 'Energy', icon: <IoLeafOutline /> },
  { link: '/music', name: 'Music', icon: <IoMusicalNotesOutline /> },
  { link: '/transit', name: 'Transit', icon: <IoTrainOutline /> },
  { link: '/weather', name: 'Weather', icon: <WiDayCloudy /> },
];

export function Nav(props) {
  const location = useLocation();

  const activeRoute = navigation.find(
    (n) => n.link === location?.pathname,
  )?.link;
  
  return (
    <nav>
      <ul>
        {navigation.map((nav) => (
          <NavLink to={nav.link} key={nav.name}>
            <li className={cx({ active: activeRoute === nav.link })}>
              {nav.icon}
            </li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
