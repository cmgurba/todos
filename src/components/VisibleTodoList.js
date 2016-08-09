import { connect } from 'react-redux';
// requires react-router 3.0.0 (alpha right now)
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
// can destruct ownProps second arg, since all we need is params.
// route's filter is now available.
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state.todos, params.filter || 'all'),
});

// wrap connect in withRouter so that connect gets the props directly
// from the route in Root.  Binds a child component to a route
// that is an ancestor of it, basically.
// withRouter is useful when you need to read route params somewhere
// deep in the component tree.
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
