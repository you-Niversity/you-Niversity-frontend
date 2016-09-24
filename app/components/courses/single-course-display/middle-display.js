'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var TitleDescriptionPrereqDisplay = React.createClass({
  render: function(){

    var showReviews = (this.props.displayReviews) ?
      "Hide Reviews" :
      "Show Instructor Reviews";

    return (
      <div>
        <div id="title-container"><h2 id="course-title">{this.props.data.title}</h2></div>
        <p id="course-description">{this.props.data.description}</p>
        <hr />
        <p id="course-prereqs"><span className="bold">Prerequisites: </span>{this.props.data.prerequisites}</p>
        <hr />
        <p className="center pointer" onClick={this.props.handleReviewDisplay}>{showReviews}</p>
      </div>
    );
  }
});

export default TitleDescriptionPrereqDisplay;
