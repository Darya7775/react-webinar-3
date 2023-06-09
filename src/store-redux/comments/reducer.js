// Начальное состояние
const initialState = {
  comments:[],
  status: "idle",
  statusComment: "idle"
};

// Обработчик действий
function reducer(state = initialState, action) {
    switch (action.type) {
        case "comments/load-start":
          return { ...state, status: "loading", comments: []};

        case "comments/load-success":
          return { ...state, status: "succeeded", comments: action.payload.comments};

        case "comments/load-error":
          return { ...state, status: "failed", comments: []};

        case "comments/sendComment-success":
          return { ...state, statusComment: "succeeded", comments: [...state.comments, action.payload.comment]};

        default:
          // Нет изменений
          return state;
      }
}

export default reducer;
