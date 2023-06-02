import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Header(props) {

  const cn = bem('Header');

  return(
    <header className={cn()}>
      {props.isAuthorization ?
      <div className={cn('wrapper')}>
        <Link className={cn('link')} to="/profile">{props.text}</Link>
        <button className={cn('button')} type='button' onClick={props.onExit}>Выход</button>
      </div>
      : <Link className={cn('button-entrance')} to="/login">Вход</Link>}
    </header>
  );
}

Header.propTypes = {
  isAuthorization: PropTypes.bool,
  onExit: PropTypes.func,
  text: PropTypes.string,
};

Header.defaultProps = {
  onExit: () => {},
}

export default memo(Header);
