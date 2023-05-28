import React from 'react';
import {NavLink} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Navigation() {

  const cn = bem('Navigation');

  return(
    <ul className={cn()}>
      <li>
        <NavLink to='/' className={cn('link')}>Главная</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
