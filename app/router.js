'use strict';
import React from 'react';
//below is an example of ES6 destructuring
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//import layouts here


//import components here
import LandingPage from './components/landing-page';
import LoginDisplay from './components/login-form';
import CourseDisplay from './components/course-display';
import SecondaryTemplate from './components/secondary-template';
import SignUpDisplay from './components/signup-form.js';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage} />
    <Route path="/login">
      <Route component={SecondaryTemplate}>
        <IndexRoute component={SignUpDisplay} />
      </Route>
    </Route>
    <Route path="/signup">
      <Route component={SecondaryTemplate}>
        <IndexRoute component={SignUpDisplay} />
      </Route>
    </Route>
  </Router>
);
