'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseDateTimePlaceInstructorDisplay from './left-display.js';
import TitleDescriptionPrereqDisplay from './middle-display.js';
import RightDisplay from './right-display.js';
import RosterList from '../roster-list.js';
import ReviewList from '../review-list.js';
import CommentBoard from '../comment-board.js';

var SingleCourseDisplay = React.createClass({

  getInitialState: function(){

    return {
      courseData: [],
      roster: [],
      commentBoard: [],
      reviews: [],
      displayReviews: false
    };
  },

  getCourseDataFromAPI: function(id, callback){
    request
      .get("http://localhost:8080/classes/" + id)
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing this course from the API");
        } else {
          this.setState({courseData: res.body[0]});
          console.log(this.state.courseData);
          if (callback) {
            callback(this.state.courseData.user_id);
          } else {
            alert("You're all signed up!");
          }
        }
      }.bind(this))
  },

  getRosterFromAPI: function(id){
    request
      .get("http://localhost:8080/rosters/" + id)
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing this roster from the API");
        } else {
          this.setState({roster: res.body});
        }
      }.bind(this))
  },

  getCommentBoardFromAPI: function(id){
    request
      .get("http://localhost:8080/classes/" + id + "/comments")
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing course comments from the API");
        } else {
          console.log("COMMENTS:");
          console.log(res.body);
          this.setState({commentBoard: res.body});
        }
      }.bind(this))
  },

  handleCommentSubmit: function(comment){
    var user_id = Number(sessionStorage.user_id);
    console.log(this.props.params.id);
    var id = this.props.params.id;
    request
      .post("http://localhost:8080/classes/" + id + "/comments")
      .send(comment)
      .send({class_id: id})
      .send({commenter_id: user_id})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error submitting this comment.");
        } else {
          this.getCommentBoardFromAPI(id);
        }
      }.bind(this))
  },

  getReviewsFromAPI: function(id){
    console.log(id);
    request
      .get("http://localhost:8080/users/" + id + "/reviews")
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing the reviews from the API");
        } else {
          console.log(res.body);
          this.setState({reviews: res.body});
        }
      }.bind(this))
  },

  handleReviewDisplay: function(){
    this.setState({displayReviews: !this.state.displayReviews})
  },

  handleUserSignup: function(){
    console.log("user tried to sign up");
    var id = this.props.params.id;
    var seats_remaining = this.state.courseData.seats_remaining - 1;

    request
      .put("http://localhost:8080/classes/" + id)
      .send({seats_remaining: seats_remaining})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error signing up for this course.");
        } else {
          console.log('Success! Now add a new roster field.');
          this.updateRoster();
        }
      }.bind(this))
  },

  updateRoster: function(){
    var id = this.props.params.id;
    var user_id = Number(sessionStorage.user_id);
    request
      .post("http://localhost:8080/rosters/" + id)
      .send({user_id: user_id})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error adding a roster field.");
        } else {
          console.log('Success! The user is now on the roster for this course.');
          this.getRosterFromAPI(id);
          this.getCourseDataFromAPI(id)
        }
      }.bind(this))
  },

  componentDidMount: function(){
    var id = this.props.params.id;
    this.getCourseDataFromAPI(id, this.getReviewsFromAPI);
    this.getRosterFromAPI(id);
    this.getCommentBoardFromAPI(id);
  },

  render: function(){

    var reviews = (this.state.reviews.length > 0 && this.state.displayReviews) ?
      <ReviewList
        data={this.state.reviews}
      /> :
      null;

    return (
        <div>
          <div className="row" id="single-course-display">
            <div className="col-sm-3 no-padding">
              <CourseDateTimePlaceInstructorDisplay
                data={this.state.courseData}
              />
            </div>
            <div className="col-sm-7">
              <TitleDescriptionPrereqDisplay
                data={this.state.courseData}
              />
            </div>
            <div className="col-sm-2 no-padding">
              <RightDisplay
                data={this.state.courseData}
                handleUserSignup={this.handleUserSignup}
                handleReviewDisplay={this.handleReviewDisplay}
                displayReviews={this.state.displayReviews}
              />
            </div>
          </div>

          {reviews}
          <RosterList
            data={this.state.roster}
          />
          <CommentBoard
            data={this.state.commentBoard}
            handleCommentSubmit={this.handleCommentSubmit}
          />
        </div>
    );
  }
});


export default SingleCourseDisplay;
