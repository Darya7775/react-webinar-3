import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function OneComment(props) {

  const cn = bem('OneComment');

  // отступ
  let sumMargin = 0;
  props.comment.level.split('px').forEach(item => sumMargin +=Number(item))

  const grey = props.user === props.comment.name ? 'OneComment-name_grey' : '';

  return(
    <>
      <li className={cn()} key={props.index} style={{marginLeft: sumMargin + 'px'}}>
        <div className={cn('wrapper')}>
          <span className={cn('name', grey)}>{props.comment.name}</span>
          <span className={cn('date')}>{props.comment.date}</span>
        </div>
        <p className={cn('text')}>{props.comment.text}</p>
        <button className={cn('button')} type='button' onClick={() => {props.setSeeItem(true); props.onParentId(); props.getParentComment(props.comment._id, props.com);}}>{props.labelAnswer}</button>
        {props.seeItem && props.idChildren === props.comment._id ? props.content : null}
      </li>
    </>
  );
};

OneComment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    level: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  setSeeItem: PropTypes.func,
  onParentId: PropTypes.func,
  getParentComment: PropTypes.func,
  saveLocal: PropTypes.func,
  index: PropTypes.number,
  seeItem: PropTypes.bool,
  user: PropTypes.string,
  content: PropTypes.element
};

OneComment.defaultProps = {
  setSeeItem: () => {},
  onParentId: () => {},
  getParentComment: () => {},
  saveLocal: () => {},
  labelAnswer: 'Ответить',
  content: <div></div>
}

export default memo(OneComment);
