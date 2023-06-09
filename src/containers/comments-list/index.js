import React, {useState, memo, useCallback} from 'react';
import {useParams, Link} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import OneComment from '../../components/one-comment';
import getDate from '../../utils/date';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import SectionComments from '../../components/section-comments';
import commentsActions from '../../store-redux/comments/action';
import Textarea from '../../components/textarea';
import Title from '../../components/title';
import Button from '../../components/button';

function CommentsList() {
  const dispatch = useDispatch();
  const params = useParams();

  console.log('commentList')

  const [parentId, setParentId] = useState({});
  const [text, setText] = useState('');
  const [activeComment, setActiveComment] = useState(Number);
  const [seeItem, setSeeItem] = useState(false);

  const select = useSelectorRedux(state => ({
    comments: state.comments.comments,
    users: state.users.users,
    status: state.comments.statusComment,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const authorization = useSelector(state => state.session.exists);

  const {t} = useTranslate();

  // список пользователей
  const users = {};
  select.users.forEach(element => {
    users[element._id] = element.profile.name;
  });

  // список комментариев
  const com = select.comments.map(item => ({_id: item._id, name: item.author.profile.name, text: item.text, parent: item.parent._id === params.id ? null : {_id: item.parent._id}, date: getDate(item.dateCreate)}));
  const comRend = treeToList(listToTree(com), (item, level) => (
    {_id: item._id, name: item.name, date: item.date, text: item.text, level: '30px'.repeat(level)}
  ));

  const body = {
    'text': text,
    'parent': parentId
  };

  const callbacks = {
    // Колбэк на ввод текста
    onChangeText: useCallback((value) => {
      setText(value);
    }, []),

    // Отправка одного комментария
    onSubmit: useCallback((e) => {
      e.preventDefault();
      dispatch(commentsActions.sendComment(body));
      setText('');
    }, [body])
  };

  let content;
  if(authorization) {
    content = <form action="/api/v1/comments?fields=*,author(profile)" method="post" onSubmit={callbacks.onSubmit}>
                <Title title={t('formComments.title')} />
                <Textarea value={text} onParentId={() => {setParentId({'_id':params.id, '_type': 'article'})}}
                          onChangeText={callbacks.onChangeText} placeholder='Текст'></Textarea>
                <Button type='submit' button={t('oneComment.sendAnswer')} />
              </form>
  } else {
    content = <div><Link to='/login'>{t('oneComment.signIn')}</Link>{t('oneComment.text')}</div>
  }

  return (
    <SectionComments quantyty={comRend.length} content={content} seeItem={seeItem} labelComments={t('comments.title')}>
      {comRend.map((comment, index) =>
        <OneComment comment={comment} key={index} index={index} setSeeItem={setSeeItem} seeItem={seeItem}
                    onParentId={() => setParentId({'_id': comment._id, '_type': 'comment'})}
                    onChangeText={callbacks.onChangeText} authorization={authorization}
                    sendComment={() => dispatch(commentsActions.sendComment(body))} value={text}
                    setActiveComment={() => setActiveComment(index)} active={activeComment}
                    status={select.status} labelAnswer={t('oneComment.answer')} parent={parentId} commentsList={comRend}
                    labelTitleAnswer={t('oneComment.titleAnswer')} labelSend={t('oneComment.sendAnswer')} labelCancel={t('oneComment.cancelAnswer')}
                    labelSingIn={t('oneComment.signIn')} labelText={t('oneComment.text')}/>
      )}
    </SectionComments>
  );
}

export default memo(CommentsList);
