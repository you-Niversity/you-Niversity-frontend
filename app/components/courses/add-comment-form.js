'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
var moment = require('moment');
moment().format();


var AddCommentForm = React.createClass({

  getInitialState: function(){
    return ({comment: ''})
  },
  handleCommentChange: function(event){
    this.setState({comment: event.target.value})
  },
  handleSubmit: function(event){
    event.preventDefault();

    var comment = this.state.comment.trim();

    if (!comment){
      console.log("Please fill out a comment before submitting");
      return;
    } else {
      this.props.changeFormDisplay();
      this.props.handleCommentSubmit({
        comment: comment
      });
    }
    this.setState({
      comment: ''
    });
  },

  render: function(){
    return (
      <form className="commentSubmitForm" onSubmit={this.handleSubmit}>
        <textarea
          type="text"
          placeholder="comment"
          value={this.state.comment}
          onChange={this.handleCommentChange}>
        </textarea>
        <input type="submit" value="Add Comment" className="form-submit-button"/>
      </form>
    );
  }
});

export default AddCommentForm;
