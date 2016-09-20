'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import TaughtBy from './taught-by.js';

var RightDisplay = React.createClass({
  render: function(){

    var showReviews = (this.props.displayReviews) ?
      "Hide Reviews" :
      "Show Reviews";

    var updateCourseButton = (Number(sessionStorage.user_id) == this.props.data.user_id) ?
      <Link to={'/update/' + this.props.data.id}><div onClick={this.props.handleCourseUpdate} className="btn-div">Update or Delete Course</div></Link>
      : null;

    var signupButton = (sessionStorage.first_name && !this.props.isUserEnrolledInCourse && !(Number(sessionStorage.user_id) == this.props.data.user_id)) ?
      <div onClick={this.props.handleUserSignup} className="btn-div">Sign Up</div>
      : null;

    var loginButton = (!sessionStorage.first_name) ?
      <Link to="/login"><div className="btn-div">Log In<br/>to Sign Up</div></Link>
      : null;

    var enrolledInCourse = (this.props.isUserEnrolledInCourse) ?
      <div className="btn-div">Enrolled!</div>
      : null;

    return (
      <div>

        {updateCourseButton}
        {signupButton}
        {loginButton}
        {enrolledInCourse}

        <div className="btn-div">{this.props.data.seats_remaining} seats left</div>
        <TaughtBy
          data={this.props.data}
        />
        <p className="center pointer" onClick={this.props.handleReviewDisplay}>{showReviews}</p>
      </div>
    );
  }
});

export default RightDisplay;
