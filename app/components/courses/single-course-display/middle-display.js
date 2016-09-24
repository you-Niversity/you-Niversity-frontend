'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var TitleDescriptionPrereqDisplay = React.createClass({
  render: function(){



    var showReviews = (this.props.displayReviews && this.props.reviews.length > 0) ?
      "Hide Instructor Reviews" :
      null;

    var hideReviews = (!this.props.displayReviews && this.props.reviews.length > 0) ?
      "Show Instructor Reviews" :
      null;

    return (
      <div>
        <div id="title-container">
          <h2 id="course-title">{this.props.data.title}</h2>
        </div>
        <p id="course-description">{this.props.data.description}</p><hr />

        <p id="course-prereqs"><span className="bold">Prerequisites: </span>{this.props.data.prerequisites}</p><hr />

        <p className="bold orange
 right pointer" onClick={this.props.handleReviewDisplay}>
          {showReviews}
          {hideReviews}
        </p>
      </div>
    );
  }
});

export default TitleDescriptionPrereqDisplay;
