import React, {memo, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Textarea from '../../components/textarea';
import './style.css';

function OneComment(props) {

  const userAnswer = props.commentsList.find(item => item._id === props.parent._id);

  const form = useRef(null);

  useEffect(() => {
    if(form.current) {
      form.current.scrollIntoView({
          behavior: "smooth"
      });
    }
  }, [form.current]);

  const cn = bem('OneComment');

  async function onSubmit(e) {
    e.preventDefault();
    if(props.value.trim()) {
      await props.sendComment();
      props.setSeeItem(false);
      props.onChangeText(' ');
    }
  };

  let content;

  if(props.authorization) {
    content = <form ref={form} className={cn('form')} action='/api/v1/comments?fields=*,author(profile)' method='post' onSubmit={onSubmit}>
                <h3>{props.labelTitleAnswer}</h3>
                <Textarea value={props.value} onChangeText={props.onChangeText} placeholder={`Мой ответ для ${userAnswer?.name}`}></Textarea>
                <div className={cn('wrapper')}>
                  <button className={cn('form-submit')} type='submit'>{props.labelSend}</button>
                  <button className={cn('form-reset')} type='reset' onClick={() => props.setSeeItem(false)}>{props.labelCancel}</button>
                </div>
              </form>
  } else {
    content = <div ref={form}>
                <button className={cn('button-singin')} type='button' onClick={props.saveLocal}>{props.labelSingIn}</button>{props.labelText}
                <button className={cn('button-cancel')} type='button' onClick={() => props.setSeeItem(false)}>{props.labelCancel}</button>
              </div>
  }

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
        {props.seeItem && props.idChildren === props.comment._id ? content : null}
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
  sendComment: PropTypes.func,
  setSeeItem: PropTypes.func,
  onChangeText: PropTypes.func,
  onParentId: PropTypes.func,
  getParentComment: PropTypes.func,
  saveLocal: PropTypes.func,
  value: PropTypes.string,
  index: PropTypes.number,
  seeItem: PropTypes.bool,
  commentsList: PropTypes.array,
  parent: PropTypes.object,
  user: PropTypes.string,
};

OneComment.defaultProps = {
  sendComment: () => {},
  setSeeItem: () => {},
  onChangeText: () => {},
  onParentId: () => {},
  getParentComment: () => {},
  saveLocal: () => {},
  labelAnswer: 'Ответить',
  labelTitleAnswer: 'Новый ответ',
  labelSend: 'Отправить',
  labelCancel: 'Отмена',
  labelSingIn: 'Войдите',
  labelText: ', чтобы иметь возможность комментировать.',
}

export default memo(OneComment);
