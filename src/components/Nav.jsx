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
  { link: '/master/', name: 'Home', icon: <IoHomeOutline /> },
  { link: '/master/lighting', name: 'Lighting', icon: <IoBulbOutline /> },
  { link: '/master/energy', name: 'Energy', icon: <IoLeafOutline /> },
  { link: '/master/music', name: 'Music', icon: <IoMusicalNotesOutline /> },
  { link: '/master/transit', name: 'Transit', icon: <IoTrainOutline /> },
  { link: '/master/weather', name: 'Weather', icon: <WiDayCloudy /> },
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
