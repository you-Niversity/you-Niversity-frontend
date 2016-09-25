'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
var moment = require('moment');
moment().format();

var Message = React.createClass({

  render: function(){
    var date = moment(this.props.date).format("MMMM Do");

    return (
      <div className="single-message">
        <div className="single-message-text">
          <p className="right">{date}</p>
          <p>{this.props.sender_first_name} said...</p>
          <h2>{this.props.message}</h2>
        </div>
      </div>
    )
  }
})

export default Message;
