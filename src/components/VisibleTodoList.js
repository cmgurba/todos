import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all'),
});

// deleted :

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id): {
//     dispatch(toggleTodo(id));
//   },
// });

// common case for mapDispatchToProps, sometimes mapState:
// arguments to the callback of mapDispatch match the
// arguments of the action creator (aka 'id' above),
// we can use the shorthand below to simply say
// the callback prop(s) (key(s)) should dispatch the action
// created by the action creator(s) (value(s)), in the object
// passed.
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
