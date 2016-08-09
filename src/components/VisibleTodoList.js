import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
// "combined selector" getvisibletodos that knows all of our state.
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';
// we're able to pass getVisibleTodos the whole state because we
// have a combined selector in reducers/index.js that knows
// the whole state, not just todos.
// this is good because now we don't have to modify our components
// if the state shape changes, because the logic here doesn't care
// about state shape.
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all'),
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
