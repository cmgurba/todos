import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import TodoList from './TodoList';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
    // this returns a promise now that we refactored it and use
    // redux-thunk middleware.
    // we could wait for it to complete to display an animation, or 
    // log or do something reactive aka:
    // fetchTodos(filter).then(() => console.log('done fetching yay!'));
  }

  render() {
    const { isFetching, toggleTodo, todos } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    isFetching: getIsFetching(state, filter),
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
