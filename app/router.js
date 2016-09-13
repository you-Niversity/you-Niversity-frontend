'use strict';
import React from 'react';
//below is an example of ES6 destructuring
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

//import layouts here


//import components here
import LandingPage from './components/landing-page';
import LoginDisplay from './components/login-form';
import CourseDisplay from './components/course-display';
import SingleCourseDisplay from './components/single-course-display';
import SecondaryTemplate from './components/secondary-template';
import SignUpDisplay from './components/signup-form.js';
import AddCourseDisplay from './components/add-course-display.js';

var AppRouter = React.createClass({
  render: function () {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={SecondaryTemplate}>
          <IndexRoute component={LoginDisplay} />
        </Route>
        <Route path="/signup">
          <Route component={SecondaryTemplate}>
            <IndexRoute component={SignUpDisplay} />
          </Route>
        </Route>
        <Route path="/courses/:id">
          <Route component={SecondaryTemplate}>
            <IndexRoute component={SingleCourseDisplay} />
          </Route>
        </Route>
        <Route path="/newcourse">
          <Route component={SecondaryTemplate}>
            <IndexRoute component={AddCourseDisplay} />
          </Route>
        </Route>
      </Router>
    )
  }
});

export default AppRouter;
