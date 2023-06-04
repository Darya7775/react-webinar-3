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
        <button className={cn('button')} type='button' onClick={() => props.onExit(props.token)}>{props.labelExit}</button>
      </div>
      : <Link className={cn('button-entrance')} to="/login">{props.labelEntry}</Link>}
    </header>
  );
}

Header.propTypes = {
  isAuthorization: PropTypes.bool,
  onExit: PropTypes.func,
  text: PropTypes.string,
  token: PropTypes.string,
  labelExit: PropTypes.string,
  labelEntry: PropTypes.string,
};

Header.defaultProps = {
  onExit: () => {},
  labelExit: 'Выход',
  labelEntry: 'Вход'
}

export default memo(Header);
