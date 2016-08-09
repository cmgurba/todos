import { combineReducers } from 'redux';

const createList = (filter) => { // eslint-disable-line arrow-body-style
  const ids = (state = [], action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case 'RECEIVE_TODOS':
        return false;
      default:
        return state;
    }
  };
  // combine ids and isFetching as the createList reducer
  return combineReducers({
    ids,
    isFetching,
  });
};

export default createList;
// new reducer needs to keep track of both of these fields
export const getIds = (state) => state.ids;
export const getIsFetching = state => state.isFetching;
