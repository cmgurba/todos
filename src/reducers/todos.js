import { combineReducers } from 'redux';
import todo from './todo';

// treat reducers more like db queries:
// both add and toggle result in returning a new
// lookup table with the last entry being a mapping
// of the current action id to the result of the 
// previous state value for this action and the action.
// (can look at todo.js for logic)
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

// add another reducer that can be called on all
// actions reduced by byId.
// state is now a list of action ids
const allIds = (state = [], action) => {
  // all we care about is ADD_TODO action,
  // we return list of current state ids, plus
  // new action id.
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

// combine these two reducers 
// you can use it as many times as you like,
// (common to combine at several levels)
const todos = combineReducers({
  byId,
  allIds,
});

export default todos;

// create new selector, only used in this file,
// to properly pull all todos using our new
// normalized reducers:
const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  // use new reducer inside here to get state.
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'active':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
