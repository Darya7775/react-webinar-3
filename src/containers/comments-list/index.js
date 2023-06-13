import React, {useState, memo, useCallback, useRef, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import OneComment from '../../components/one-comment';
import getDate from '../../utils/date';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import list from '../../utils/list';
import getIdChildren from '../../utils/id-children';
import SectionComments from '../../components/section-comments';
import commentsActions from '../../store-redux/comments/action';
import Textarea from '../../components/textarea';
import Title from '../../components/title';
import Button from '../../components/button';
import Wrapper from '../../components/wrapper';

function CommentsList() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useRef(null);

  console.log('commentList')

  const [parentId, setParentId] = useState({});
  const [text, setText] = useState('');
  const [seeItem, setSeeItem] = useState(false);
  const [idChildren, setIdChildren] = useState('');

  useEffect(() => {
    if(form.current && seeItem) {
      form.current.scrollIntoView({
          behavior: "smooth"
      });
    }
  }, [form.current]);

  const select = useSelectorRedux(state => ({
    comments: state.comments.comments,
    users: state.users.users,
    status: state.comments.statusComment,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const authorization = useSelector(state => state.session.exists);
  const authorizedUser = useSelector(state => state.session.user);

  const {t} = useTranslate();

  // список пользователей
  const users = {};
  select.users.forEach(element => {
    users[element._id] = element.profile.name;
  });

  // список комментариев
  const com = select.comments.map(item => ({_id: item._id, name: item.author.profile.name, text: item.text, parent: item.parent._id === params.id ? null : {_id: item.parent._id}, date: getDate(item.dateCreate)}));
  const comRend = treeToList(listToTree(com), (item, level) => (
    {_id: item._id, name: item.name, date: item.date, text: item.text, level: level < 13 ? '30px'.repeat(level) : '30px'.repeat(13)}
    )
  );

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
      if(text.trim()) {
        dispatch(commentsActions.sendComment(body));
        setText('');
        setSeeItem(false);
      }
    }, [body, text]),

    // получение id ребенка, после которого отображать форму
    getParentComment: useCallback((id, com) => {
      const listCh = list(com)[id];
      setIdChildren(listCh ? getIdChildren(listCh) : id);
    }, []),

    // сохранение ссылки для back
    saveLocal: useCallback(() => {
      navigate('/login', {state: { back: location.pathname }})
    }, [])
  };

  // имя пользователя, которму отвечаем
  const userAnswer = comRend.find(item => item._id === parentId._id);

  let content;
  if(authorization) {
    content = seeItem ? (
      <Wrapper margin='top'>
        <form ref={form} action='/api/v1/comments?fields=*,author(profile)' method='post' onSubmit={callbacks.onSubmit}>
          <Title title={t('oneComment.titleAnswer')} />
          <Textarea class='Textarea_comment' value={text} onChangeText={callbacks.onChangeText} placeholder={`Мой ответ для ${userAnswer?.name}`}></Textarea>
          <Wrapper>
            <Button type='submit' button={t('oneComment.sendAnswer')} class='Button' />
            <Button type='reset' onClick={() => setSeeItem(false)} button={t('oneComment.cancelAnswer')} class='Button' />
          </Wrapper>
        </form>
      </Wrapper>
    ) : (
      <form ref={form} action="/api/v1/comments?fields=*,author(profile)" method="post" onSubmit={callbacks.onSubmit}>
        <Title title={t('formComments.title')} />
        <Textarea value={text} onParentId={() => {setParentId({'_id':params.id, '_type': 'article'})}}
                  onChangeText={callbacks.onChangeText} placeholder='Текст'></Textarea>
        <Button type='submit' button={t('oneComment.sendAnswer')} class='Button' />
      </form>
    )
  } else {
    content = seeItem ? (
      <div ref={form}>
        <Button type='button' onClick={callbacks.saveLocal} button={t('oneComment.signIn')} class='Button-link' />{t('oneComment.text')}
        <Button class='Button-link_grey' type='button' onClick={() => setSeeItem(false)} button={t('oneComment.cancelAnswer')}/>
      </div>
    ) : (
      <div ref={form}><Button type='button' onClick={callbacks.saveLocal} button={t('oneComment.signIn')} class='Button-link' />{t('oneComment.text')}</div>
    )
  }

  return (
    <SectionComments quantyty={comRend.length} content={content} seeItem={seeItem} labelComments={t('comments.title')}>
      {comRend.map((comment, index) =>
        <OneComment comment={comment} key={index} index={index} setSeeItem={setSeeItem} seeItem={seeItem}
                    onParentId={() => setParentId({'_id': comment._id, '_type': 'comment'})} com={com} content={content}
                    getParentComment={callbacks.getParentComment} idChildren={idChildren} user={authorizedUser?.profile?.name}
                    labelAnswer={t('oneComment.answer')}/>
      )}
    </SectionComments>
  );
}

export default memo(CommentsList);
