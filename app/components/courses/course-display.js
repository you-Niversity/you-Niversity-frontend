'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

import request from 'superagent';
import MapIcon from '../icons/map-icon.js';
import ListIcon from '../icons/list-icon.js';


import Course from './course.js';
import MapDisplay from './map-display.js';


var CourseDisplay = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      showMap: false,
      showList: true
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

  handleViewChange: function(){
    this.setState({showMap: !this.state.showMap, showList: !this.state.showList})
    console.log(this.state.showMap, this.state.showList);
  },

  render: function() {

    var mapView = (this.state.showMap) ?
        <MapDisplay
          data={this.state.data}
          filterText={this.props.filterText}
          center={[Number(this.props.lat), Number(this.props.lng)]}
          radius={this.props.radius}
          zoom={8}
        />
        : null;

    var listView = (this.state.showList) ?
        <AllCourseList
          data={this.state.data}
          filterText={this.props.filterText}
          lat={Number(this.props.lat)}
          lng={Number(this.props.lng)}
          radius={this.props.radius}
        />
        : null;

    return (
      <div className="CourseDisplay">
      <div className="row" id="class-display">
        <h3>Upcoming Classes</h3>
        <h4>
          <span className="course-display-change pointer" onClick={this.handleViewChange}>
            <ListIcon />
             List
          </span>
          <span className="black">  | </span>
          <span className="course-display-change pointer" onClick={this.handleViewChange}>
            <MapIcon />
            Map
          </span>
        </h4>
      </div>

        {mapView}
        {listView}

      </div>
    );
  }
});

var AllCourseList = React.createClass({
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




export default CourseDisplay;
