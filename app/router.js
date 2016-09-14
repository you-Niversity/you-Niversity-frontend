'use strict';
import React from 'react';
//below is an example of ES6 destructuring
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

//import layouts here


//import components here
import LandingPage from './components/landing-page';
import LoginDisplay from './components/login-form';
import CourseDisplay from './components/courses/course-display';
import SingleCourseDisplay from './components/courses/single-course-display';
import PrimaryTemplate from './components/primary-template';
import SecondaryTemplate from './components/secondary-template';
import SignUpDisplay from './components/signup-form.js';
import AddCourseDisplay from './components/courses/add-course-display.js';
import UserDashboard from './components/user-dashboard.js';

var AppRouter = React.createClass({
  render: function () {
    return (
      <Router history={browserHistory}>
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
          <Route component={PrimaryTemplate}>
            <IndexRoute component={SingleCourseDisplay} />
          </Route>
        </Route>
        <Route path="/addcourse">
          <Route component={PrimaryTemplate}>
            <IndexRoute component={AddCourseDisplay} />
          </Route>
        </Route>
        <Route path="/users/:id">
          <Route component={PrimaryTemplate}>
            <IndexRoute component={UserDashboard} />
          </Route>
        </Route>
      </Router>
    )
  }
});

export default AppRouter;
