'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import TaughtBy from './taught-by.js';
import { connect } from 'react-redux';

var RightDisplay = React.createClass({
  render: function(){

    var classFull = (this.props.data.seats_remaining == 0) ?
      <div className="btn-div">No Seats Remaining</div>
      : <div className="btn-div">{this.props.data.seats_remaining} seats left</div>;



    var updateCourseButton = (Number(sessionStorage.user_id) == this.props.data.user_id) ?
      <Link className="link-plain" to={'/update/' + this.props.data.id}><div onClick={this.props.handleCourseUpdate} className="btn-danger btn-div">Update or Delete Course</div></Link>
      : null;

    var signupButton = (sessionStorage.first_name && !this.props.isUserEnrolledInCourse && !(Number(sessionStorage.user_id) == this.props.data.user_id) && (!this.props.data.seats_remaining == 0)) ?
      <div onClick={this.props.handleUserSignup} className="btn-success btn-div pointer">Sign Up</div>
      : null;

    var loginButton = (!sessionStorage.first_name && (!this.props.data.seats_remaining == 0)) ?
      <Link className="link-plain" to="/login"><div className="btn-success btn-div">Log In<br/>to Sign Up</div></Link>
      : null;

    var enrolledInCourse = (this.props.isUserEnrolledInCourse) ?
        <div className="btn-div">Enrolled!</div>
      : null;

    var leaveClass = (this.props.isUserEnrolledInCourse) ?
      <div onClick={this.props.showUnenrollModal} className="btn-div btn-danger pointer">Leave Class</div>
      : null;

    return (
      <div>

        {updateCourseButton}
        {signupButton}
        {loginButton}
        {enrolledInCourse}
        {leaveClass}
        {classFull}
        <TaughtBy
          data={this.props.data}
          initiateMessageClick={this.props.initiateMessageClick}
        />
      </div>
    );
  }
});

const mapStateToProps = function(store) {
  return store;
}
module.exports = connect(mapStateToProps)(RightDisplay);
