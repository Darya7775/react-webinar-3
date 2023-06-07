import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Header from '../../components/header';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Head from '../../components/head';
import FormAuthorization from '../../components/form-authorization';


function Login() {

  const store = useStore();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  let user = {
    'login': login,
    'password': password,
    'remember': true
  };

  const {t} = useTranslate();

  async function onSubmitForm(evt) {
    evt.preventDefault();
    await store.actions.authorization.authorization(user);
  };

  const authorization = useSelector(state => state.authorization.authorization);
  const token = useSelector(state => state.authorization.token);
  const error = useSelector(state => state.authorization.error);

  if(authorization) {
    localStorage.clear();
    localStorage.setItem('token', token);
  }

  if(authorization) {
    // перенаправление на страницу пользователя
    return(<Navigate replace to='/profile' />);
  }

  const onLoginChange = e => setLogin(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);

  return(
    <PageLayout head={<Header labelEntry={t('header.entry')} labelExit={t('header.exit')} />}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <FormAuthorization  login={login} password={password} onLoginChange={onLoginChange}
                          onPasswordChange={onPasswordChange} onSubmitForm={onSubmitForm}
                          authorization={authorization} error={error} labelTitle={t('form.title')}
                          labelLogin={t('form.login')} labelPassword={t('form.password')}
                          labelEntry={t('form.entry')} side={'start'} padding={'small'}/>
    </PageLayout>
  );
}

export default Login;
