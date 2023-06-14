import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({data, t}) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{t('profile.title')}</h3>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.name')}:</div>
        <div className={cn('value')}>{data?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.telephone')}:</div>
        <div className={cn('value')}>{data?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{data?.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  data: PropTypes.object.isRequired,
};

ProfileCard.defaultProps = {
  onAdd: () => {}
}

export default memo(ProfileCard);
