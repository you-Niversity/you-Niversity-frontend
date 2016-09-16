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
          lat={this.props.lat}
          lng={this.props.lng}
          radius={this.props.radius}
        />
      </div>
    );
  }
});

var AllCourseList = React.createClass({
  render: function() {

    var courseNodes = this.props.data.map(function(course) {
      var filterTextLowerCase = this.props.filterText.toLowerCase();
      var courseTitleLowerCase = course.title.toLowerCase();

      console.log(this.props.radius);
      var radius = this.props.radius;
      var userLat = this.props.lat;
      var userLng = this.props.lng;
      console.log(radius, userLat, userLng);
      var withinLatRadius = (course.lat < (userLat + radius) && course.lat > (userLat - radius));
      var withinLngRadius = (course.lng > (userLng - radius) && course.lng < (userLng + radius));
      var withinRadius = ((course.lng > (userLng - radius) && course.lng < (userLng + radius)) && (course.lat < (userLat + radius) && course.lat > (userLat - radius)));
      console.log(course.city, withinRadius, withinLngRadius, withinLatRadius);

      if ((this.props.filterText !== '' && courseTitleLowerCase.indexOf(filterTextLowerCase) === -1)){
        console.log("if statement");
        return;
      }

      if(withinRadius === false) {
        console.log('radius changed');
        return;
      }

      console.log("*********************");

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
