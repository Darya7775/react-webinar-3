import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({ children, title,  close }) {

  const cn = bem('Modal');

  return(
    <>
      <div className='Overlay' onClick={close}/>
      <div className='Modal'>
        <div className={cn('wrapper')}>
          <h2>{title}</h2>
          <button className={cn('button')} type='button' onClick={close}>Закрыть</button>
        </div>
        {children}
      </div>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func,
}

Modal.defaultProps = {
  close: () => {},
};

export default Modal;
