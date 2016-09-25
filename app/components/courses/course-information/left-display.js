'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var CourseDateTimePlaceInstructorDisplay = React.createClass({
  render: function(){
    return (
      <div className="left-course-display center">
        <p className="bold">{this.props.data.date}</p>
        <p>{this.props.data.start_time} to {this.props.data.end_time}</p>
        <p className="bold">{this.props.data.address}</p>
        <p>{this.props.data.city}, {this.props.data.state}</p>
        <div className="btn-div">${this.props.data.price}</div>
      </div>
    );
  }
});

export default CourseDateTimePlaceInstructorDisplay;
