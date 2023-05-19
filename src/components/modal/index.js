import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ children,  open }) {
  return(
    <>
      <div className='Overlay' onClick={open}/>
      <div className='Modal'>
        {children}
      </div>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.func,
}

Modal.defaultProps = {
  open: () => {},
};

export default Modal;
