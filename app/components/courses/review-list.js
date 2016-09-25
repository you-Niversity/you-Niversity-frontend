'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
var moment = require('moment');
moment().format();

var ReviewList = React.createClass({

  render: function(){
    var reviewNodes = this.props.data.map(function(review){
      return (
        <Review
          date={moment(review.creation_date).format("MMMM Do YYYY")}
          name={review.first_name + ' ' + review.last_name}
          profile_pic={review.profile_pic}
          review={review.review}
          key={"review" + review.id}
        >
        </Review>
      )
    });

    return (
      <div id="roster-review-comments-div">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="center">Instructor Reviews</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-10 roster-list">
            <div className="row">
              {reviewNodes}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Review = React.createClass({

  render: function(){

    var reviewerImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')',
    }

    return (
      <div className="row">
        <div className="col-sm-3 reviewer-image-style" style={reviewerImageStyle}></div>
        <div className="col-sm-9">
          <p className="reviewer-name">{this.props.name}</p>
          <p>{this.props.date}</p>
          <p className="review-message">{this.props.review}</p>
          <hr />
        </div>

      </div>
    )
  }
});



export default ReviewList;
