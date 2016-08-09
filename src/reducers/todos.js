import { combineReducers } from 'redux';
import todo from './todo';

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

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds,
});

// Dan's pattern : default export is the main reducer.
// named export functions starting with "get" are functions
// that select something from state to be displayed to the
// ui based on logic.  Commonly called "selectors"
export default todos;

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);


// colocate selectors with reducers.  Selectors depend
// on the state structure, and reducers are the source of
// truth for state structure.  If it changes, colocating
// selectors w/ reducers can help make sure updates are
// done accordingly.  
export const getVisibleTodos = (state, filter) => {
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
