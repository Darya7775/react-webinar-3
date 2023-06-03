import React, {useCallback} from "react";
import {Navigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import ProfileCard from "../../components/profile-card";

function Profile() {

  const store = useStore();
  const {t} = useTranslate();

  const token = JSON.parse(localStorage.getItem('token'));

  useInit(() => {
    if(token) {
      store.actions.user.load(token);
    }
  }, [token]);

  const authorization = useSelector(state => state.user.authorization);
  const user = useSelector(state => ({...state.user.user}));
  const profile = {...user.profile};

  const callbacks = {
    // Выход из профиля
    exit: useCallback((token) => {store.actions.user.exit(token); localStorage.clear()}, [store]),
  }

  // перенаправление на страницу авторизации
  if(!token) {
    return(<Navigate replace to="/login"/>);
  }

  return(
    <PageLayout head={<Header isAuthorization={authorization} text={profile.name} onExit={callbacks.exit} token={token}/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard user={user} profile={profile}/>
    </PageLayout>
  );
}

export default Profile;
