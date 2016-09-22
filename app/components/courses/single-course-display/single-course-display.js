'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseDateTimePlaceInstructorDisplay from './left-display.js';
import TitleDescriptionPrereqDisplay from './middle-display.js';
import RightDisplay from './right-display.js';
import RosterList from '../roster-list.js';
import ReviewList from '../review-list.js';
import CommentBoard from '../comment-board.js';
import { connect } from 'react-redux';
import Modal from 'boron/OutlineModal';
import modalStyles from '../../styles/modal-styles.js';

var DATABASE_URL = "https://you-niversity-postgresql.herokuapp.com/";

var SingleCourseDisplay = React.createClass({

  getInitialState: function(){

    return {
      courseData: [],
      roster: [],
      commentBoard: [],
      reviews: [],
      displayReviews: false,
      isUserEnrolledInCourse: false
    };
  },

  getCourseDataFromAPI: function(id, callback){
    request
      .get(DATABASE_URL + "/classes/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({courseData: res.body[0]});
          if (callback) {
            callback(this.state.courseData.user_id);
          } else {
            this.showModal();
          }
        }
      }.bind(this))
  },

  refreshCourseDataAfterUnenrolling: function(id){
    request
      .get(DATABASE_URL + "/classes/" + id)
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing this course from the API");
        } else {
          this.setState({courseData: res.body[0]});
          getRosterFromAPI(id);
        }
      }.bind(this))
  },

  getRosterFromAPI: function(id){
    request
      .get(DATABASE_URL + "/rosters/" + id)
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing this roster from the API");
        } else {
          var roster = res.body;
          if(sessionStorage.user_id) {
            for (var i = 0; i < roster.length; i++){
              if (sessionStorage.user_id == roster[i].id) {
                this.setState({roster: roster, isUserEnrolledInCourse: true})
              } else {
                this.setState({roster: roster});
              }
            }
          } else {
            this.setState({roster: roster});
          }
        }
      }.bind(this))
  },

  getCommentBoardFromAPI: function(id){
    request
      .get(DATABASE_URL + "/classes/" + id + "/comments")
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing course comments from the API");
        } else {
          this.setState({commentBoard: res.body});
        }
      }.bind(this))
  },

  handleCommentSubmit: function(comment){
    var user_id = Number(sessionStorage.user_id);
    var id = this.props.params.id;
    request
      .post(DATABASE_URL + "/classes/" + id + "/comments")
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
    request
      .get(DATABASE_URL + "/users/" + id + "/reviews")
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing the reviews from the API");
        } else {
          this.setState({reviews: res.body});
        }
      }.bind(this))
  },

  handleReviewDisplay: function(){
    this.setState({displayReviews: !this.state.displayReviews})
  },

  handleUserSignup: function(){
    var id = this.props.params.id;
    var seats_remaining = this.state.courseData.seats_remaining - 1;

    request
      .put(DATABASE_URL + "/classes/" + id + "/signup")
      .send({seats_remaining: seats_remaining})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error signing up for this course.");
        } else {
          this.updateRoster();
        }
      }.bind(this))
  },

  handleUserUnenrollSeatsRemaining: function(){
    var id = this.props.params.id;
    var seats_remaining = this.state.courseData.seats_remaining + 1;
    request
      .put(DATABASE_URL + "/classes/" + id + "/signup")
      .send({seats_remaining: seats_remaining})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error signing up for this course.");
        } else {
          this.refreshCourseDataAfterUnenrolling(id);
          this.updateRosterUnenroll();
        }
      }.bind(this))
  },

  updateRosterUnenroll: function(){
    var id = this.props.params.id;
    var user_id = Number(sessionStorage.user_id);
    request
      .del(DATABASE_URL + "/rosters/" + id)
      .send({user_id: user_id})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error in deleting this user.");
        } else {
          this.getRosterFromAPI(id);
          this.hideUnenrollModal();
          this.showModalConfirmUnenroll()
        }
      }.bind(this))
  },

  updateRoster: function(){
    var id = this.props.params.id;
    var user_id = Number(sessionStorage.user_id);
    request
      .post(DATABASE_URL + "/rosters/" + id)
      .send({user_id: user_id})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error adding a roster field.");
        } else {
          this.getRosterFromAPI(id);
          this.getCourseDataFromAPI(id)
        }
      }.bind(this))
  },

  showModal: function(){
      this.refs.modal.show();
  },
  hideModal: function(){
      this.refs.modal.hide();
  },

  showUnenrollModal: function(){
      this.refs.modalUnenroll.show();
  },
  hideUnenrollModal: function(){
      this.refs.modalUnenroll.hide();
  },

  showModalConfirmUnenroll: function(){
      this.refs.modalConfirmUnenroll.show();
  },
  hideModalConfirmUnenroll: function(){
      this.refs.modalConfirmUnenroll.hide();
      browserHistory.push('/');
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
                showUnenrollModal={this.showUnenrollModal}
                reviews={this.state.reviews}
                handleReviewDisplay={this.handleReviewDisplay}
                displayReviews={this.state.displayReviews}
                isUserEnrolledInCourse={this.state.isUserEnrolledInCourse}
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

          <Modal ref="modal" style={modalStyles.container}>
              <h2 style={modalStyles.title}>You are all signed up!</h2>
              <button style={modalStyles.btn} onClick={this.hideModal}>Close</button>
          </Modal>

          <Modal ref="modalUnenroll" style={modalStyles.container}>
              <h2 style={modalStyles.title}>Are you sure you want to leave this class?</h2>
              <button style={modalStyles.btn} onClick={this.handleUserUnenrollSeatsRemaining}>Yes</button>
              <button style={modalStyles.btn} onClick={this.hideUnenrollModal}>Cancel</button>
          </Modal>

          <Modal ref="modalConfirmUnenroll" style={modalStyles.container}>
              <h2 style={modalStyles.title}>You are no longer enrolled in this course.</h2>
              <button style={modalStyles.btn} onClick={this.hideModalConfirmUnenroll}>Close</button>
          </Modal>

        </div>
    );
  }
});

const mapStateToProps = function(store) {
  return store;
}
module.exports = connect(mapStateToProps)(SingleCourseDisplay);
