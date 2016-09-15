'use strict';
import React from 'react';
import nocache from 'superagent-no-cache';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import Course from './course.js';


var CourseDisplay = React.createClass({
  getInitialState: function() {
    return {
      data: [],
    };
  },

  getCoursesFromAPI: function() {
    request
      .get("http://localhost:8080/classes")
      .end(function(err, res){
        if (err){
          console.log('There was an error grabbing the classes from the API.');
        } else {
          this.setState({data: res.body});
        }
      }.bind(this))
  },

  componentDidMount: function() {
    this.getCoursesFromAPI();
  },

  render: function() {
    return (
      <div className="CourseDisplay">
        <AllCourseList
          data={this.state.data}
          filterText={this.props.filterText}
        />
      </div>
    );
  }
});

var AllCourseList = React.createClass({
  render: function() {

    var courseNodes = this.props.data.map(function(course) {
      if ((this.props.filterText !== '' && course.title.indexOf(this.props.filterText) === -1)){
        console.log('if');
        return;
      };
      return (
        <Course
          title={course.title}
          image_url={course.image_url}
          date={course.date}
          key={course.id}
          id={course.id}>
        </Course>
      )
    }.bind(this));

    return (
      <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8" id="class-display">
            <div className="row"><h3>Upcoming Classes</h3></div>
            <div id="course-block" className="row">
              {courseNodes}
            </div>
          </div>
      </div>

    );
  }
});

export default CourseDisplay;
