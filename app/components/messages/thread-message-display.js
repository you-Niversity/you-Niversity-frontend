'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Message from './message.js';
import request from 'superagent';

var MessageList = React.createClass({

  getInitialState: function(){
    return ({
      message: ''
    })
  },

  handleMessageChange: function(event){
    this.setState({message: event.target.value});
  },

  handleSubmit: function(){
    console.log('send post request now');
    this.props.handleMessageSubmit(this.state.message);
    this.setState({message: ''});
  },

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

    var textArea = {
      width: "98%",
      height: "100px"
    }

    return (
      <div className="message-list">
        {messageNodes}
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            placeholder="reply"
            style={textArea}
            required
            value={this.state.message}
            onChange={this.handleMessageChange}>
          </textarea>
          <input type="submit" value="Send" className="btn-success form-submit-button submit-message-button"/>
        </form>
      </div>
    )
  }
})


export default MessageList;
