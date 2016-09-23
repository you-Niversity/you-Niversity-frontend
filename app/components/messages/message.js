'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var Message = React.createClass({
  render: function(){

    return (
      <div className="single-message">
        <p>{this.props.date}</p>
        <p>{this.props.message}</p>
      </div>
    )
  }
})


export default Message;
