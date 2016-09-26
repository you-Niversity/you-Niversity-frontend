'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import MessageIcon from '../icons/message-icon.js';


var RosterList = React.createClass({

  render: function(){

    var noStudents = (this.props.data.length === 0) ?
      <p className="center no-data-message">There are no students enrolled. <Link className="link-plain link-orange" to="/login">Be the first!</Link></p>
      : null;

    var rosterNodes = this.props.data.map(function(student){
      return (
        <Student
          first_name={student.first_name}
          instructor_id={this.props.instructor_id}
          last_name={student.last_name}
          profile_pic={student.profile_pic}
          key={student.id}
          id={student.id}
          initiateMessageClick={this.props.initiateMessageClick}>
        </Student>
      )
    }.bind(this));

    return (
      <div id="roster-review-comments-div">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="center">Course Roster</h2>
          </div>
        </div>
        <div className="row">
          {noStudents}
          <div className="col-sm-2"></div>
          <div className="col-sm-8 roster-list">
            <div className="row">
              {rosterNodes}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Student = React.createClass({

  initiateMessageClick: function(){
    console.log("send that fool a message!");
    this.props.initiateMessageClick(this.props.id)
  },

  render: function(){

    var studentImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')'
    }

    var sendMessageOption = (sessionStorage.user_id && Number(sessionStorage.user_id) == this.props.instructor_id) ?
      <div><span onClick={this.initiateMessageClick} className="message-student pointer"><MessageIcon /></span>
      <div className="student-profile-img center" style={studentImageStyle}></div></div>
      :
      <div className="student-profile-img no-top-margin center" style={studentImageStyle}></div>;

    var studentImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')',
    }

    return (
      <div className="col-sm-3">
        <h3 className="center">{this.props.first_name} {this.props.last_name}</h3>
        {sendMessageOption}
      </div>
    )
  }
});

export default RosterList;
