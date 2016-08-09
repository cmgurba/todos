import React, { PropTypes } from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

// we were able to remove the { params } from the app component,
// and not pass it as a param to VisibleTodoList because withRouter
// can pull it from App's parent route
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

App.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string,
  }),
};

export default App;
