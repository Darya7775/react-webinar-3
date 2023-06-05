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
  console.log("login")

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  let user = {
    'login': login,
    'password': password
  };

  const {t} = useTranslate();

  async function onSubmitForm(evt) {
    evt.preventDefault();
    await store.actions.user.authorization(user);
  };

  const authorization = useSelector(state => state.user.authorization);
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);

  if(!localStorage.length  && authorization) {
    localStorage.clear();
    localStorage.setItem('token', JSON.stringify(token));
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
                          labelEntry={t('form.entry')}/>
    </PageLayout>
  );
}

export default Login;
