'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
var moment = require('moment');
moment().format();
import AddCommentForm from './add-comment-form.js';
import Comment from './comment.js';
import { connect } from 'react-redux';

var CommentBoard = React.createClass({

  getInitialState: function(){
    return {
      displayForm: false
    }
  },

  handleFormDisplay: function(){
    this.setState({displayForm: !this.state.displayForm})
  },

  render: function(){

    var noCommentsNotLogged = (this.props.data.length == 0 && !sessionStorage.first_name) ?
      <p className="center no-data-message">No comments. <Link className="link-plain link-orange" to="/login">Log in and sign up</Link> to start commenting!</p>
      : null;

    var noCommentsLogged = (this.props.data.length == 0 && sessionStorage.first_name) ?
      <p className="center no-data-message">Be the first to add a comment!</p>
      : null;

    var noCommentsLoggedNotSignedUp = (this.props.data.length == 0);

    var commentNodes = this.props.data.map(function(comment){
      return (
        <Comment
          date={moment(comment.comment_date).format("MMMM Do YYYY")}
          name={comment.first_name + ' ' + comment.last_name}
          profile_pic={comment.profile_pic}
          comment={comment.comment}
          key={"review" + comment.id}
        >
        </Comment>
      )
    });

    var addCommentButton = (this.props.isUserEnrolledInCourse || this.props.instructor_id == Number(sessionStorage.user_id)) ?
      <div className="row no-margin">
          <p className="add-comment" onClick={this.handleFormDisplay}>
            + add comment
          </p>
      </div>
      : null;

    var addCommentForm = (this.state.displayForm) ?
      <AddCommentForm
        handleCommentSubmit={this.props.handleCommentSubmit}
        changeFormDisplay={this.handleFormDisplay}
      /> :
      null;

    return (
      <div id="roster-review-comments-div">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="center">Comment Board</h2>
          </div>
        </div>

        {addCommentButton}
        {addCommentForm}

        <div className="row">
          {noCommentsNotLogged}
          {noCommentsLogged}

          <div className="col-sm-2"></div>
          <div className="col-sm-10 roster-list">
            <div className="row">
              {commentNodes}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const mapStateToProps = function(store) {
  return store;
}
module.exports = connect(mapStateToProps)(CommentBoard);
