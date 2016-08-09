// hey! we can do all the stuff in 16/17 with a redux function : applyMiddleware
import { createStore, applyMiddleware } from 'redux';
// promise logic like we enabled in 16/17 is available in redux-promise
import promise from 'redux-promise';
// logger logic like 16/17 is available in redux-logic :troll:
import createLogger from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  // conditionally include logger,
  // note that passing applyMiddleware to createStore
  // passes it as the "enhancer" arg to that fn
  // the 3 args create store actually takes is:
  // app component, persistedState (discussed before), and then enhancer
  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
