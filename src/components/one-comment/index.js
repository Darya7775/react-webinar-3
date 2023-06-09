import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Textarea from '../../components/textarea';
import './style.css';

function OneComment(props) {

  const userAnswer = props.commentsList.find(item => item._id === props.parent._id);

  const cn = bem('OneComment');

  async function onSubmit(e) {
    e.preventDefault();
    await props.sendComment();
    props.setSeeItem(false);
    props.onChangeText(' ');
  };

  let content;

  if(props.authorization) {
    content = <form className={cn('form')} action='/api/v1/comments?fields=*,author(profile)' method='post' onSubmit={onSubmit}>
                <h3>{props.labelTitleAnswer}</h3>
                <Textarea value={props.value} onChangeText={props.onChangeText} placeholder={`Мой ответ для ${userAnswer?.name}`}></Textarea>
                <div className={cn('wrapper')}>
                  <button className={cn('form-submit')} type='submit'>{props.labelSend}</button>
                  <button className={cn('form-reset')} type='reset' onClick={() => props.onChangeText(' ')}>{props.labelCancel}</button>
                </div>
              </form>
  } else {
    content = <div>
                <Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать
              </div>
  }

  // отступ
  let sumMargin = 0;
  props.comment.level.split('px').forEach(item => sumMargin +=Number(item))

  return(
    <>
      <li className={cn()} key={props.index} style={{marginLeft: sumMargin + 'px'}}>
        <div className={cn('wrapper')}>
          <span className={cn('name')}>{props.comment.name}</span>
          <span className={cn('date')}>{props.comment.date}</span>
        </div>
        <p className={cn('text')}>{props.comment.text}</p>
        <button className={cn('button')} type='button' onClick={() => {props.setActiveComment(); props.setSeeItem(true); props.onParentId();}}>{props.labelAnswer}</button>
        {props.index === props.active && props.seeItem ? content : null}
      </li>
    </>
  );
};

OneComment.propTypes = {
  comment: PropTypes.shape({
    level: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  sendComment: PropTypes.func,
  setSeeItem: PropTypes.func,
  onChangeText: PropTypes.func,
  onParentId: PropTypes.func,
  setActiveComment: PropTypes.func,
  value: PropTypes.string,
  index: PropTypes.number,
  activ: PropTypes.number,
  seeItem: PropTypes.bool,
  commentsList: PropTypes.array,
  parent: PropTypes.object
};

OneComment.defaultProps = {
  sendComment: () => {},
  setSeeItem: () => {},
  onChangeText: () => {},
  onParentId: () => {},
  setActiveComment: () => {},
  labelAnswer: 'Ответить',
  labelTitleAnswer: 'Новый ответ',
  labelSend: 'Отправить',
  labelCancel: 'Отмена'
}

export default memo(OneComment);
