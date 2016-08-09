import { createStore } from 'redux';
import todoApp from './reducers';

const logger = (store) => (next) => {
  /* eslint-disable no-console */
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};
// next is the dispatch at that current moment.
// can't call it rawDispatch anymore because it might (and has) been modified by
// other middlewares.

// function that returns a function that returns afunction
// alternate syntax : 
// const addPromiseSupportToDispatch = (store) => {
//   return (next) => {
//     return (action) {
//       if (typeof action.then === 'function') {
//         return action.then(next);
//       }
//       return next(action);
//     };
//   };
// };
// mental model to digest this syntax below : consider it
// a function with multiple arguments that are used as they come
// available.  
const promise = (store) => (next) => (action) => { // eslint-disable-line no-unused-vars
  // wrap to see if action is of type promise... we don't want a promise object so we call
  // promise's then()
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

// for every middleware, override the store.dispatch function with
// the curried middleware function.  
// consider this function being called with promise above:
// store is the store, next is the dispatch, and this assigns
// store.dispatch to the action function declared above as the most
// deeply nested function.
const wrapDispatchWithMiddlewares = (store, middlewares) =>
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch); // eslint-disable-line no-param-reassign
  });

const configureStore = () => {
  const store = createStore(todoApp);
  // specify middlewares in the order in which the action travels through them.
  // we then need to call reverse in our wrapdispatch to make sure the 
  // wrapping logic order is preserved.  Logger wraps base store.dispatch,
  // then promise wraps logger dispatch.  Not sure why order matters here.
  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    // array of functions to be applied as middleware
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};

export default configureStore;
