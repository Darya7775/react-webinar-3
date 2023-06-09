import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function SectionComments(props) {
  return(
    <section className='SectionComments'>
      <h2 className='SectionComments-title'>{props.labelComments} ({props.quantyty})</h2>
      {props.quantyty ?
      <>
        <ul className='SectionComments-list'>
          {props.children}
        </ul>
        {props.seeItem || props.content}
      </>
      : props.content}
    </section>
  );
}

SectionComments.propTypes = {
  children: PropTypes.node,
  quantyty: PropTypes.number,
  seeItem: PropTypes.bool,
  content: PropTypes.object
};

SectionComments.defaultProps = {
  labelComments: 'Комментарии',
}

export default memo(SectionComments);

