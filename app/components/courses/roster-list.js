'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var RosterList = React.createClass({
  render: function(){

    var noStudents = (this.props.data.length === 0) ?
      <p className="center no-data-message">There are no students enrolled. <Link className="link-plain link-orange
" to="/login">Be the first!</Link></p>
      : null;

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

  render: function(){

    var studentImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')',
    }

    return (
      <div className="col-sm-3">
        <h3 className="center">{this.props.first_name} {this.props.last_name}</h3>
        <div className="student-profile-img center" style={studentImageStyle}></div>
      </div>
    )
  }
});

export default RosterList;
