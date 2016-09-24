'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import MessageIcon from '../../icons/message-icon.js';

var TaughtBy = React.createClass({

  initiateMessageClick: function(){
    this.props.initiateMessageClick();
  },

  render: function(){

    console.log(typeof(Number(sessionStorage.user_id)), typeof(this.props.data.user_id));

    var sendMessageOption = (Number(sessionStorage.user_id) !== this.props.data.user_id) ?
      <span onClick={this.initiateMessageClick} className="pointer"><MessageIcon />Message</span>
      : null;

    var instructorImageStyle = {
      backgroundImage: 'url(' + this.props.data.profile_pic + ')',
    }
    var lineHeight = {
      lineHeight: 1
    }

    return (
        <div className="center" id="taught-by">
          <p style={lineHeight} className="bold">Taught by:</p>
          <Link to={'/users/'+this.props.data.user_id}>
            <p style={lineHeight}>{this.props.data.first_name} {this.props.data.last_name}</p>
            <div className="instructor-profile-img" style={instructorImageStyle}></div>
          </Link>
          {sendMessageOption}
        </div>
    );
  }
});

export default TaughtBy;
