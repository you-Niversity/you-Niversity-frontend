'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Message from './message.js';

var MessageList = React.createClass({
  render: function(){
    var messageNodes = this.props.data.map(function(message, index) {
      return (
        <Message
          key={'message' + index}
          date={message.creation_date}
          message={message.message}
          read={message.read}
          sender_profile_pic={message.sender_profile_pic}
          sender_first_name={message.sender_first_name}>
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
