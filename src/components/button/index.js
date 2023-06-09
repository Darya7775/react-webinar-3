import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button(props) {
  return(
    <button type={props.type} className='Button'>{props.button}</button>
  )
}

Button.propTypes = {
  button: PropTypes.string,
  type: PropTypes.string
}

Button.defaultProps = {
  button: 'Отправить',
  type: 'button'
}

export default memo(Button);
