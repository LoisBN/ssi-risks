import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { test } from '../redux/actions';
import Home from './Homepage/Home';
import { Router, Route } from 'react-router-dom';
import history from './history';
import Form from './Forms/Form';
import Header from './Homepage/Header/Header';

const App = ({ test }) => {
  useEffect(() => {
    test();
  }, [test]);
  return (
    <div>
      <Router history={history}>
        <Route path='/' exact component={Home} />
        <Route path='/project/init' exact>
          <Header
            page={{
              title: 'initier un projet',
              subtitle: "Identification du système d'information"
            }}
          />
          <Form />
        </Route>
      </Router>
    </div>
  );
};

export default connect(null, { test })(App);
