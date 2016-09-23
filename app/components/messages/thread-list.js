'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Thread from './thread.js';

var ThreadList = React.createClass({

  render: function(){
    var threadNodes = this.props.data.map(function(thread, index) {
      return (
        <Thread
          key={'thread' + thread.thread_id}
          id={thread.id}
          sender_first_name={thread.sender_first_name}
          sender_last_name={thread.sender_last_name}
          recipient_first_name={thread.recipient_first_name}
          recipient_last_name={thread.recipient_last_name}
          title={thread.title}
          unread={thread.unread_messages}
          onThreadClick={this.props.onThreadClick}>
        </Thread>

      )
    }.bind(this));

    return (
      <div className="thread-list">
        {threadNodes}
      </div>
    )
  }
})


export default ThreadList;
