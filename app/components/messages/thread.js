'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var Thread = React.createClass({

  render: function(){

    return (
      <div className="single-thread" onClick={this.props.onThreadClick}>
        <h2>{this.props.sender_first_name} {this.props.sender_last_name}</h2>
        <h3>{this.props.title}</h3>
      </div>
    )
  }
})


export default Thread;
