'use strict';
import React, {PropTypes, Component} from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Course from './course.js';

var CourseListDisplay = React.createClass({
  render: function() {

    var courseNodes = this.props.data.map(function(course) {
      var filterTextLowerCase = this.props.filterText.toLowerCase();
      var courseTitleLowerCase = course.title.toLowerCase();

      var radius = this.props.radius;
      var userLat = this.props.lat;
      var userLng = this.props.lng;
      var withinLatRadius = (course.lat < (userLat + radius) && course.lat > (userLat - radius));
      var withinLngRadius = (course.lng > (userLng - radius) && course.lng < (userLng + radius));
      var withinRadius = ((course.lng > (userLng - radius) && course.lng < (userLng + radius)) && (course.lat < (userLat + radius) && course.lat > (userLat - radius)));


      if ((this.props.filterText !== '' && courseTitleLowerCase.indexOf(filterTextLowerCase) === -1)){
        return;
      }

      if(withinRadius === false) {
        return;
      }


      return (
        <Course
          title={course.title}
          image_url={course.image_url}
          date={course.date}
          key={'course' + course.id}
          id={course.id}>
        </Course>
      )
    }.bind(this));

    return (
      <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div id="course-block" className="row">
              {courseNodes}
            </div>
          </div>
      </div>

    );
  }
});

export default CourseListDisplay;
