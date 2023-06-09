import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Title(props) {
  return(
    <h3 className="Title">{props.title}</h3>
  )
}

Title.propTypes = {
  title: PropTypes.string
}

Title.defaultProps = {
  title: 'Новый комментарий'
}

export default memo(Title);
