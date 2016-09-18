'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import RosterList from './roster-list.js';
import ReviewList from './review-list.js';
import CommentBoard from './comment-board.js';

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
          callback(this.state.courseData.user_id);
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

var CourseDateTimePlaceInstructorDisplay = React.createClass({
  render: function(){
    return (
      <div className="left-course-display center">
        <p className="bold">{this.props.data.date}</p>
        <p>{this.props.data.start_time} to {this.props.data.end_time}</p>
        <p className="bold">{this.props.data.address}</p>
        <p>{this.props.data.city}, {this.props.data.state}</p>
        <div className="btn-div">${this.props.data.price}</div>
      </div>
    );
  }
});

var TitleDescriptionPrereqDisplay = React.createClass({
  render: function(){
    return (
      <div>
        <div id="title-container"><h2 id="course-title">{this.props.data.title}</h2></div>
        <p id="course-description">{this.props.data.description}</p>
        <hr />
        <p id="course-prereqs"><span className="bold">Prerequisites: </span>{this.props.data.prerequisites}</p>
        <hr />
      </div>
    );
  }
});

var RightDisplay = React.createClass({
  render: function(){
    var showReviews = (this.props.displayReviews) ? "Hide Reviews" : "Show Reviews";

    return (
      <div>
        <div className="btn-div">Sign Up</div>
        <div className="btn-div">{this.props.data.seats_remaining} seats left</div>
        <TaughtBy
          data={this.props.data}
        />
        <p className="center pointer" onClick={this.props.handleReviewDisplay}>{showReviews}</p>
      </div>
    );
  }
});

var TaughtBy = React.createClass({
  render: function(){

    var instructorImageStyle = {
      backgroundImage: 'url(' + this.props.data.profile_pic + ')',
    }

    return (
        <div className="center" id="taught-by">
          <p className="bold">Your Instructor</p>
          <Link to={'/users/'+this.props.data.user_id}><p>{this.props.data.first_name} {this.props.data.last_name}</p>
          <div className="instructor-profile-img" style={instructorImageStyle}></div></Link>
        </div>
    );
  }
});


export default SingleCourseDisplay;
