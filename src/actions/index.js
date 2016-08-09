import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
// split out into more action types.. request, success, failure.
// refactor accordingly in reducers.
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response,
      });
    },
    // promise rejection handler.  more commonly done in the syntax :
    // .then(post => {
    //   ...success callback body..
    // })
    // .catch(err => {
    //   ... failure callback body...
    // });
    // i think.
    // update : he actually has a reason for doing it this way:
    // if your success then() callback has an internal error,
    // a .catch() would catch it and display the below error, which
    // is inaccurate.  Alternative promise behavior is that then()
    // takes two arguments, the first being the success callback,
    // the second being the error callback!
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      });
    }
  );
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
