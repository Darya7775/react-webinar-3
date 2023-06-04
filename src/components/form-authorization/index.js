import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FormAuthorization(props) {

  const cn = bem('Form');

  return(
    <form className={cn()} action='/api/v1/users/sign' method='post' onSubmit={props.onSubmitForm}>
      <h2 className={cn('title')}>{props.labelTitle}</h2>
      <div className={cn('wrapper')}>
        <label htmlFor='login'>{props.labelLogin}</label>
        <input type='text' id='login' value={props.login} onChange={props.onLoginChange} name='login' required></input>
      </div>
      <div className={cn('wrapper')}>
        <label htmlFor='password'>{props.labelPassword}</label>
        <input type='password' id='password' value={props.password} onChange={props.onPasswordChange} name='password' required></input>
      </div>
      {props.authorization || <div className={cn('error')}>{props.error}</div>}
      <button className={cn('button')} type='submit'>{props.labelEntry}</button>
    </form>
  );
}

FormAuthorization.propTypes = {
  onSubmitForm: PropTypes.func,
  onLoginChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  login: PropTypes.string,
  password: PropTypes.string,
  authorization: PropTypes.bool,
  error: PropTypes.string,
  labelTitle: PropTypes.string,
  labelLogin: PropTypes.string,
  labelPassword: PropTypes.string,
  labelEntry: PropTypes.string
};

FormAuthorization.defaultProps = {
  onSubmitForm: () => {},
  onLoginChange: () => {},
  onPasswordChange: () => {},
  labelTitle: 'Вход',
  labelLogin: 'Логин',
  labelPassword: 'Пароль',
  labelEntry: 'Войти'
}

export default memo(FormAuthorization);
