'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
var moment = require('moment');
moment().format();

var CommentBoard = React.createClass({
  render: function(){

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

    return (
      <div id="roster-review-comments-div">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="center">Comment Board</h2>
          </div>
        </div>
        <div className="row">
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

var Comment = React.createClass({

  render: function(){

    var commenterImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: "100%",
      border: "2px solid orange",
      width: "60px",
      height: "60px"
    }

    var nameStyle = {
      color: "orange",
      fontWeight: "700",
      fontSize: "1.3em",
      padding: "10px 0"
    }
    var commentStyle = {
      fontSize: "1.1em",
      fontWeight: "400",
      padding: "10px 0"
    }

    return (
      <div className="row">
        <div className="col-sm-3" style={commenterImageStyle}></div>
        <div className="col-sm-9">
          <p style={nameStyle}>{this.props.name}</p>
          <p>{this.props.date}</p>
          <p style={commentStyle}>{this.props.comment}</p>
          <hr />
        </div>
      </div>
    )
  }
});

export default CommentBoard;
