export default {
  /**
   * Загрузка комментарией
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {

      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*`
        });
        // Комментарии загружен успешно
        dispatch({type: 'comments/load-success', payload: {comments: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  sendComment: (body) => {
    return async (dispatch, getState, services) => {

      const token = localStorage.getItem('token');

      try {
        const res = await services.api.request({
          url: '/api/v1/comments?fields=*,author(profile)',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token
          },
          body: JSON.stringify(body)
        });
        // Комментарий успешно отправлен
        dispatch({type: 'comments/sendComment-success', payload: {comment: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        console.log(e)
        dispatch({type: 'comments/sendComment-error'});
      }
    }
  },
}
