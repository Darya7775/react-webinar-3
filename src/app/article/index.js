import {memo, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/action';
import usersActions from '../../store-redux/users/actions';
import CommentsList from '../../containers/comments-list';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  console.log('article')

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(async () => {
    await Promise.all([
      //store.actions.article.load(params.id);
      dispatch(commentsActions.load(params.id)),
      dispatch(articleActions.load(params.id)),
      dispatch(usersActions.load())
    ]);
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
        <CommentsList />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
