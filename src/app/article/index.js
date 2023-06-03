import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import Header from '../../components/header';

function Article() {
  const store = useStore();

  const token = JSON.parse(localStorage.getItem('token'));

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
    if(token) {
      store.actions.user.load(token);
    }
  }, [params.id, token]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const authorization = useSelector(state => state.user.authorization);
  const userName = useSelector(state => ({...state.user.user.profile}));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Выход из профиля
    exit: useCallback((token) => {store.actions.user.exit(token); localStorage.clear()}, [store]),
  }

  return (
    <PageLayout head={<Header isAuthorization={authorization} text={userName.name} onExit={callbacks.exit} token={token} />}>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
