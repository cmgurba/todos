import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter,
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});
// this function is now utilizing redux-thunk through its declaration
// in configureStore where we add middleware.
// look at redux-thunk docs or contineu to use redux-sagas if better..
// the signature here is common for a function that uses thunk middleware
export const fetchTodos = (filter) => (dispatch, getState) => {
  // avoid race condition : if we're already fetching, don't allow
  // another dispatched similar request + fetch todos until the 
  // first one is done fetching.
  if (getIsFetching(getState(), filter)) {
    // return an immediately resolved promise so
    // the return value of this function remains consistent.
    // (we return an api.fetchTodos.then() with our .then()
    // callback below)
    return Promise.resolve();
  }

  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
