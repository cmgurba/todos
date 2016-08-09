import { combineReducers } from 'redux';

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };
  // new reducer logic.
  // a reducer can't have undefined initial state,
  // but it can have null.  Make its absence explicit,
  // always give a default state value!
  //remember this is a sub-function, "filter" refers
  // to filter passed into createList above.
  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    // handle error if failure, otherwise return null.
    // null will clear the error message.  Why? :
    // this is because getErrorMessage is passed to
    // mapStateToProps through our reducer hierarchy:
    // 1. named export selector below (pulls errorMessage
    // from here).  
    // 2. Then our wrapper selector in reducers/index.js.
    // 3. Then import in VisibleTodoList
    //    component and pass into mapStateToProps.
    // 4.  This will put it on props, so when it's destructured
    //     in VisibleTodoList's Render, it won't pass the
    //     conditional in charge of displaying the error message
    //     and retry button.
    // ;O
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
