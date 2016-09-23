'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Message from './message.js';

var MessageList = React.createClass({
  render: function(){
    console.log(this.props.data);
    var messageNodes = this.props.data.map(function(message, index) {
      return (
        <Message
          key={'message' + index}
          date={message.creation_date}
          message={message.message}
          read={message.read}>
        </Message>

      )
    }.bind(this));

    return (
      <div className="message-list">
        {messageNodes}
      </div>
    )
  }
})


export default MessageList;
