'use strict';
import React from 'react';
//below is an example of ES6 destructuring
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

//import layouts here
import PrimaryTemplate from './components/primary-template';
import SecondaryTemplate from './components/secondary-template';
import LandingPage from './components/landing-page/landing-page';

//import components here
import LoginDisplay from './components/login-form';
import SingleCourseDisplay from './components/courses/single-course-display.js';
import SignUpDisplay from './components/signup-form.js';
import AddCourseDisplay from './components/courses/add-course-display.js';
import UpdateCourseDisplay from './components/courses/update-course-display.js';
import UserDashboard from './components/user-dashboard.js';
import MessageDisplay from './components/messages/message-display.js';
import ErrorDisplay from './components/server-error-page.js';
import AboutMe from './components/about-me.js';

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
        <Route path="/update/:id">
          <Route component={PrimaryTemplate}>
            <IndexRoute component={UpdateCourseDisplay} />
          </Route>
        </Route>
        <Route path="/users/:id">
          <Route component={PrimaryTemplate}>
            <IndexRoute component={UserDashboard} />
          </Route>
        </Route>
        <Route path="/messages/:id">
          <Route component={PrimaryTemplate}>
            <IndexRoute component={MessageDisplay} />
          </Route>
        </Route>
        <Route path="/about">
          <Route component={SecondaryTemplate}>
            <IndexRoute component={AboutMe} />
          </Route>
        </Route>
        <Route path="/error">
          <Route component={SecondaryTemplate}>
            <IndexRoute component={ErrorDisplay} />
          </Route>
        </Route>
      </Router>
    )
  }
});

export default AppRouter;
