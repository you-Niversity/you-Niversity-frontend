'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Course from './course.js';

var CourseList = React.createClass({
  render: function() {

    var courseNodes = this.props.data.map(function(course) {
      return (
        <Course
          title={course.title}
          image_url={course.image_url}
          date={course.date}
          key={course.class_id}
          id={course.class_id}>
        </Course>
      )
    }.bind(this));

    return (
      <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10" id="class-display">
            <div className="row"><h3>{this.props.header}</h3></div>
            <div id="course-block" className="row">
              {courseNodes}
            </div>
          </div>
      </div>
    );
  }
});


export default CourseList;
