import StoreModule from "../module";

/**
 * Данные пользователя
 */
class User extends StoreModule {

  initState() {
    return {
      user: {},
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
        userName: result.result.user.username,
        authorization: true,
      }, 'Пользователь авторизован');

    } catch (e) {
      // Ошибка авторизации
      this.setState({
        ...this.getState(),
        error: result.error.message
      }, 'Пользователь не авторизован');
    }
  }

  /**
   Получение данных о пользователе
   * @param token {String} токен пользователя
  */

  async load(token) {

    let result;

    this.setState({
      ...this.getState(),
      user: {},
      authorization: true,
    });

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      })
      result = await response.json();

      // Пользователь авторизован
      this.setState({
        ...this.getState(),
        user: {...result.result},
      }, 'Загружены данные пользователя');

    } catch (e) {
      // Ошибка загрузки
      console.log(result)
      this.setState({
        ...this.getState(),
        error: result.error.message
      }, 'Данные пользователя не загружены');
    }
  }

  exit() {
    this.setState({
      user: {},
      authorization: false,
      userName: '',
      token: '',
      error: ''
    }, 'Пользователь вышел');
  }
}

export default User;
