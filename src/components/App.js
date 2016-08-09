import React, { PropTypes } from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
// params comes from router (we give it /(:filter) in Root.js)
const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodoList
      filter={params.filter || 'all'}
    />
    <Footer />
  </div>
);

App.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string,
  }),
};

export default App;
