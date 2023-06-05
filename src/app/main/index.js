import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Header from '../../components/header';

function Main() {

  const store = useStore();

  const token = JSON.parse(localStorage.getItem('token'));

  useInit(() => {
    store.actions.catalog.initParams();
    if(token) {
      store.actions.user.loading(token);
    }
  }, [token], true);

  const authorization = useSelector(state => state.user.authorization);
  const userName = useSelector(state => ({...state.user.user.profile}));

  if(!sessionStorage.length && authorization) {
    sessionStorage.setItem('item', JSON.stringify({name: userName.name}))
  }

  const {t} = useTranslate();

  const callbacks = {
    // Выход из профиля
    exit: useCallback((token) => {store.actions.user.exit(token); localStorage.clear(); sessionStorage.clear();}, [store]),
  }

  return (
    <PageLayout head={<Header isAuthorization={authorization} text={userName.name}
                              onExit={callbacks.exit} token={token}
                              labelEntry={t('header.entry')} labelExit={t('header.exit')} />}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
