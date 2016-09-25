'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Thread from './thread.js';

var ThreadList = React.createClass({

  render: function(){
    var threadNodes = this.props.data.map(function(thread, index) {
      var sender_first_name = thread.sender_first_name;
      var sender_last_name = thread.sender_last_name;
      var sender_profile_pic = thread.sender_profile_pic;

      if (thread.sender_first_name === sessionStorage.first_name) {
        sender_first_name = thread.recipient_first_name;
        sender_last_name = thread.recipient_last_name;
        sender_profile_pic = thread.recipient_profile_pic;
      }

      return (
        <Thread
          key={'thread' + thread.thread_id}
          id={thread.thread_id}
          data_tag={thread.thread_id}
          sender_first_name={sender_first_name}
          sender_last_name={sender_last_name}
          sender_profile_pic={sender_profile_pic}
          recipient_first_name={thread.recipient_first_name}
          recipient_last_name={thread.recipient_last_name}
          recipient_profile_pic={thread.recipient_profile_pic}
          title={thread.title}
          unread={thread.unread_messages}
          onThreadClick={this.props.onThreadClick}
          onTrashClick={this.props.deleteThread}>
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
