import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';
// this used to be todos.js. refactoring to our main reducer landing point.
//renamded idsByFiler to listByFilter since the implementation of createList
// is opaque as far as we are concerned
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;
// also refactor to fromById.getTodo and just pass ids to avoid
// rippling changes across reducers that affect state structure
// we don't have to care what further reducers do with these ids
// now.
export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};
