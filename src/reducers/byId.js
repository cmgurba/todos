// normalized response of todos.  Don't have to handle specific cases and then construct a response
// we just construct an object with the spreaded todos on response.entities (normalizr property)
const byId = (state = {}, action) => {
  // it'll only pass this conditional if it has a normalized response
  // it only has a normalized response if it hit our 'api' actions.
  // otherwise we don't need to add any new todos.
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];
