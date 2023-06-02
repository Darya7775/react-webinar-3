import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";


function Login() {

  const store = useStore();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  let user = {
    "login": login,
    "password": password
  };

  const {t} = useTranslate();

  async function onSubmitForm(evt) {
    evt.preventDefault();
    await store.actions.user.authorization(user);
  };

  const authorization = useSelector(state => state.user.authorization);
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);

  if(authorization) {
    localStorage.clear();
    localStorage.setItem('token', JSON.stringify(token));

    // перенаправление на страницу пользователя
    return(<Navigate replace to="/profile" />);
  }

  const onLoginChange = e => setLogin(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);

  return(
    <PageLayout>
      <Header/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <form action="/api/v1/users/sign" method="post" onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="login">Логин</label>
          <input type="text" id="login" value={login} onChange={onLoginChange} name="login" required></input>
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" value={password} onChange={onPasswordChange} name="password" required></input>
        </div>
        {authorization || <div>{error}</div>}
        <button type="submit">Войти</button>
      </form>
    </PageLayout>
  );
}

export default Login;
