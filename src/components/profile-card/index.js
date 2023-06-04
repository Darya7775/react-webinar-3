import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {

  const cn = bem('ProfileCard');

  return(
    <section className={cn()}>
      <h2 className={cn('title')}>{props.labelProfile}</h2>
      <div className={cn('item')}>{props.labelName}: <span className={cn('text')}>{props.profile.name}</span></div>
      <div className={cn('item')}>{props.labelTelephone}: <span className={cn('text')}>{props.profile.phone}</span></div>
      <div className={cn('item')}>email: <span className={cn('text')}>{props.user.email}</span></div>
    </section>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  labelProfile: PropTypes.string,
  labelName: PropTypes.string,
  labelTelephone: PropTypes.string,
};

ProfileCard.defaultProps = {
  labelProfile: 'Профиль',
  labelName: 'Имя',
  labelTelephone: 'Телефон'
}

export default ProfileCard;
