'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var ReviewList = React.createClass({
  render: function(){

    var reviewNodes = this.props.data.map(function(review){
      return (
        <Review
          date={review.creation_date}
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
          <div className="col-sm-8 roster-list">
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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: "60px",
      height: "60px"
    }

    return (
      <div className="row">
        <div className="col-sm-3 reviewer-profile-img" style={reviewerImageStyle}></div>
        <div className="col-sm-9">
          <p>{this.props.name}</p>
          <p>{this.props.review}</p>
          <p>{this.props.date}</p>
        </div>

      </div>
    )
  }
});



export default ReviewList;
