'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

import request from 'superagent';
import MapIcon from '../icons/map-icon.js';
import ListIcon from '../icons/list-icon.js';

import MapDisplay from './map-display.js';
import CourseListDisplay from './course-list-display.js';

var DATABASE_URL = "https://you-niversity.herokuapp.com";

var CourseDisplay = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      showMap: false,
      showList: true
    };
  },

  getCoursesFromAPI: function() {
    console.log(DATABASE_URL);
    request
      .get(DATABASE_URL + "/classes")
      .end(function(err, res){
        if (err){
          browserHistory.push('/error');
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
  },

  render: function() {

    var mapView = (this.state.showMap) ?
        <MapDisplay
          data={this.state.data}
          filterText={this.props.filterText}
          center={[Number(this.props.lat), Number(this.props.lng)]}
          lat={Number(this.props.lat)}
          lng={Number(this.props.lng)}
          radius={this.props.radius}
          zoom={10}
        />
        : null;

    var listView = (this.state.showList && this.state.data.length > 0) ?
        <CourseListDisplay
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


export default CourseDisplay;
