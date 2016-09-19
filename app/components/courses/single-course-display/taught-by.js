'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var TaughtBy = React.createClass({
  render: function(){

    var instructorImageStyle = {
      backgroundImage: 'url(' + this.props.data.profile_pic + ')',
    }

    return (
        <div className="center" id="taught-by">
          <p className="bold">Your Instructor</p>
          <Link to={'/users/'+this.props.data.user_id}><p>{this.props.data.first_name} {this.props.data.last_name}</p>
          <div className="instructor-profile-img" style={instructorImageStyle}></div></Link>
        </div>
    );
  }
});

export default TaughtBy;
