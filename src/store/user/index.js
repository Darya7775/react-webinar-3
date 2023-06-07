import StoreModule from "../module";

/**
 * Данные пользователя
 */
class User extends StoreModule {

  initState() {
    return {
      user: {},
      error: ''
    }
  }

  /**
   Получение данных о пользователе
   * @param token {String} токен пользователя
  */

  async loading(token) {

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
      this.setState({
        ...this.getState(),
        error: result.error.data.issues[0].message,
      }, 'Данные пользователя не загружены');
    }
  }
}

export default User;
