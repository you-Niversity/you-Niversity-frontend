'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import TaughtBy from './taught-by.js';

var RightDisplay = React.createClass({
  render: function(){

    var showReviews = (this.props.displayReviews) ?
      "Hide Reviews" :
      "Show Reviews";

    var signupButton = (sessionStorage.first_name) ?

      <div onClick={this.props.handleUserSignup} className="btn-div">Sign Up</div> :

      <Link to="/login"><div className="btn-div">Log In <br/>to Sign Up</div></Link>;


    return (
      <div>

        {signupButton}

        <div className="btn-div">{this.props.data.seats_remaining} seats left</div>
        <TaughtBy
          data={this.props.data}
        />
        <p className="center pointer" onClick={this.props.handleReviewDisplay}>{showReviews}</p>
      </div>
    );
  }
});

export default RightDisplay;
