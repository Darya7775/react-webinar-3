import React, {useCallback} from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Header from '../../components/header';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Head from '../../components/head';
import ProfileCard from '../../components/profile-card';

function Profile() {

  const store = useStore();
  const {t} = useTranslate();

  const token = useSelector(state => state.authorization.token);

  useInit(() => {
    store.actions.user.loading(token);
  }, [token]);

  const authorization = useSelector(state => state.authorization.authorization);
  const user = useSelector(state => ({...state.user.user}));
  const profile = {...user.profile};

  const callbacks = {
    // Выход из профиля
    exit: useCallback((token) => {store.actions.authorization.exit(token); localStorage.clear();}, [store]),
  }

  return(
    <PageLayout head={<Header isAuthorization={authorization} text={profile.name}
                              onExit={callbacks.exit} token={token}
                              labelEntry={t('header.entry')} labelExit={t('header.exit')}/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard  user={user} profile={profile} labelName={t('profile.name')}
                    labelTelephone={t('profile.telephone')} labelProfile={t('profile')}/>
    </PageLayout>
  );
}

export default Profile;
