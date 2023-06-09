export default {
  /**
   * Загрузка пользвателей
   * @return {Function}
   */
  load: () => {
    return async (dispatch, getState, services) => {

      dispatch({type: 'users/load-start'});

      try {
        const res = await services.api.request({
          url: '/api/v1/users'
        });
        // Пользователи загружены успешно
        dispatch({type: 'users/load-success', payload: {users: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'users/load-error'});
      }
    }
  },
}
