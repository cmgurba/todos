import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

// move fetchTodos to component (VisibleTodoList:
//fetchTodos('all').then(todos =>
//   console.log(todos)
// );

const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
