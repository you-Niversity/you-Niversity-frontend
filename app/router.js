'use strict';
import React from 'react';
//below is an example of ES6 destructuring
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//import layouts here


//import components here
import LandingPage from './components/landing-page';
import LoginDisplay from './components/login-form';
import CourseDisplay from './components/course-display';
import SingleCourseDisplay from './components/single-course-display';
import SecondaryTemplate from './components/secondary-template';
import SignUpDisplay from './components/signup-form.js';
import AddCourseDisplay from './components/add-course-display.js';

export default (
  <Router history={browserHistory}>
    {/*<Route path="/" component={LandingPage} /> */}
    <Route path="/login">
      <Route component={SecondaryTemplate}>
        <IndexRoute component={LoginDisplay} />
      </Route>
    </Route>
    <Route path="/signup">
      <Route component={SecondaryTemplate}>
        <IndexRoute component={SignUpDisplay} />
      </Route>
    </Route>
    <Route path="classes/:id">
      <Route component={SecondaryTemplate}>
        <IndexRoute component={SingleCourseDisplay} />
      </Route>
    </Route>
    <Route path="/">
      <Route component={SecondaryTemplate}>
        <IndexRoute component={AddCourseDisplay} />
      </Route>
    </Route>

  </Router>
);
