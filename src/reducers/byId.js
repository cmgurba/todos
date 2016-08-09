const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS': // eslint-disable-line no-case-declarations
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    // this is now required because of our new action of creating a todo + dispatching success action
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response,
      };
    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];
