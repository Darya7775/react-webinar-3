// Начальное состояние
const initialState = {
  users:[]
};

// Обработчик действий
function reducer(state = initialState, action) {
    switch (action.type) {
        case "users/load-start":
          return { ...state, users: [], waiting: true};

        case "users/load-success":
          return { ...state, users: action.payload.users, waiting: false};

        case "users/load-error":
          return { ...state, users: [], waiting: false};

        default:
          // Нет изменений
          return state;
      }
}

export default reducer;
