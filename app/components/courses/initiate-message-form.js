'use strict';

import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import modalStylesMargin from '../styles/modal-styles-margin.js';
var moment = require('moment');
moment().format();


var InitiateMessageForm = React.createClass({

  getInitialState: function(){
    return ({
      message: ''
    })
  },
  handleMessageSubmit: function(message){
    this.props.handleMessageSubmit(message)
  },

  handleMessageChange: function(event){
    this.setState({message: event.target.value})
  },

  handleSubmit: function(event){
    event.preventDefault();

    var message = this.state.message.trim();

    if (!message){
      console.log("Please fill out a comment before submitting");
      return;
    } else {
      this.handleMessageSubmit({
        message: message
      });
    }
    this.setState({
      message: ''
    });
  },

  render: function(){

    var textAreaStyle = {
      width: "80%",
      marginLeft: "10%"
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          type="text"
          style={textAreaStyle}
          required
          placeholder="type message here..."
          value={this.state.message}
          onChange={this.handleMessageChange}>
        </textarea>
        <button style={modalStylesMargin.btn} onClick={this.handleSubmit}>Send</button>
      </form>
    );
  }
});

export default InitiateMessageForm;
