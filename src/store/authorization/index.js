import StoreModule from "../module";

class Authorization extends StoreModule {

initState() {
  return {
    userName: '',
    authorization: false,
    token: '',
    error: ''
  }
}

/**
 авторизация пользователя
 * @param [user] {Object} данные пользователя
*/

async authorization(user) {

  let result;

  try {
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    })
    result = await response.json();

    // Пользователь авторизован
    this.setState({
      ...this.getState(),
      token: result.result.token,
      userName: result.result.user.profile.name,
      authorization: true,
    }, 'Пользователь авторизован');

  } catch (e) {
    // Ошибка авторизации
    this.setState({
      ...this.getState(),
      error: result.error.data.issues[0].message
    }, 'Пользователь не авторизован');
  }
}

async check() {
  let result;

    const token = localStorage.getItem('token');
    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    })
    result = await response.json();
    console.log(result)

    if(response.status === 200) {
      // Пользователь авторизован
      this.setState({
        ...this.getState(),
        token: token,
        userName: result.result.profile.name,
        authorization: true,
      }, 'Пользователь проверен');
    } else {
      // Ошибка авторизации
      this.setState({
        ...this.getState(),
        authorization: false,
        error: result.error.data.issues[0].message
      }, 'Пользователь не проверен');
    }
}

/**
   Удаление данных о пользователе
   * @param token {String} токен пользователя
  */

  async exit(token) {

    let result;

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      })
      result = await response.json();

      // Пользователь удален
      this.setState({
        ...this.getState(),
        userName: '',
        token: '',
        error: '',
        authorization: !result,
      }, 'Пользователь вышел');

    } catch (e) {
      // Ошибка удаления
      console.log(result)
      this.setState({
        ...this.getState(),
        error: result.error.message
      }, 'Пользователь не вышел');
    }
  }
}

export default Authorization;
