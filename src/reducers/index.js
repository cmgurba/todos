import { combineReducers } from 'redux';
// rename named imports with namespace import syntax so we don't have name clashing.
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

// add named export selector.  the state of this
// corresponds to the state of the COMBINED reducer above.

// this allows us to go back to VisibleTodoList and call this
// instead of getVisibleTodos from ./todos which only has
// part of the state
export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
