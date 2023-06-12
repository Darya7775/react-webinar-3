import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Wrapper({children, margin}) {
  const cn = bem('Wrapper');
  return (
    <div className={cn({margin})}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.oneOf(['top-bottom', 'top', 'button']),
}

Wrapper.defaultProps = {};

export default memo(Wrapper);
