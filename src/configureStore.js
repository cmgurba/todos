import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import todoApp from './reducers';
// thunk middleware, supports dispatching of thunks
// *** this is the standard format of middleware functions in redux ***
const thunk = (store) => (next) => (action) => // eslint-disable-line no-confusing-arrow
  // if the action itself is a function, assume it is a thunk
  // and call the action with the dispatch as an arg.
  // otherwise we assume it needs to be passed to the 'next'
  // middleware.
  typeof action === 'function' ?
    action(store.dispatch) :
    next(action);

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
