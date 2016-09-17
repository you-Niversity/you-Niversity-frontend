'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var RosterList = React.createClass({
  render: function(){

    var rosterNodes = this.props.data.map(function(student){
      return (
        <Student
          first_name={student.first_name}
          last_name={student.last_name}
          profile_pic={student.profile_pic}
          key={student.id}>
        </Student>
      )
    });

    return (
      <div id="roster-review-comments-div">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="center">Your Classmates</h2>
          </div>
        </div>
        <div className="row">
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

  render: function(){

    var studentImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')',
    }

    return (
      <div className="col-sm-3">
        <p className="center">{this.props.first_name} {this.props.last_name}</p>
        <div className="student-profile-img center" style={studentImageStyle}></div>
      </div>
    )
  }
});

export default RosterList;
