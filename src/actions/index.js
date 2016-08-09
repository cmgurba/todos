import { v4 } from 'node-uuid';
import * as api from '../api';
// now we can call api functions inside actions.
const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});
// "asynchronous" action creator.  calls fetch, waits on promise resolve
// then hands back receiveTodos call on filter, response
export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response)
  );

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
