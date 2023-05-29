import React from 'react';
import './style.css';

function Spinner ({ text = '', size = '5em' }) {
  const header = text ? <h4>{text}</h4> : null
  return (
    <div className='Spinner'>
      {header}
      <div className='Spinner-loader' style={{ height: size, width: size }} />
    </div>
  )
}

export default Spinner;
