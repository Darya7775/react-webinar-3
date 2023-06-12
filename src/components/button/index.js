import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button(props) {
  return(
    <button type={props.type} className={props.class} onClick={props.onClick}>{props.button}</button>
  )
}

Button.propTypes = {
  button: PropTypes.string,
  type: PropTypes.string,
  class: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  button: 'Отправить',
  type: 'button',
  class: 'Button',
  onClick: () => {}
}

export default memo(Button);
