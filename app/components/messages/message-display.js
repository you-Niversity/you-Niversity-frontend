'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import Modal from 'boron/OutlineModal';
import modalStyles from '../styles/modal-styles.js';
import ThreadList from './thread-list.js';
import MessageList from './thread-message-display.js';


var DATABASE_URL = "http://localhost:8080";


var MessageDisplay = React.createClass({

  getInitialState: function(){
    return({
      threads: [],
      messages: []
    })
  },

  componentDidMount: function(){
    console.log('component mounted!');
    var id = this.props.params.id;
    this.getThreadDataFromAPI(id);
  },

  getThreadDataFromAPI: function(id){
    request
      .get(DATABASE_URL + "/messages/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({threads: res.body});
        }
      }.bind(this))
  },

  onThreadClick: function(){
    this.getMessageDataFromAPI();
  },

  getMessageDataFromAPI: function(){
    request
      .get(DATABASE_URL + "/messages/thread/" + 1)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({messages: res.body});
        }
      }.bind(this))
  },

  render: function(){

    var messageBoxStyle = {
      border: "2px solid orange",
      margin: "65px 0 75px 0",
      width: "100%",
      height: "300px"
    }

    var headerStyle = {
      color: "orange",
      fontSize: "2.5em",
      fontWeight: "700",
      padding: "10px"
    }

    var noMargins = {
      margin: '0 0 0 10px'
    }

    var displayMessages = (this.state.messages.length === 0) ?
      <h1>Click a thread to the left to display messages.</h1>
      : <MessageList
          data={this.state.messages}
        />

    return (
      <div style={messageBoxStyle}>
        <div className="row" style={noMargins}>
            <div className="row" style={headerStyle}>
              <h1 >Inbox</h1>
            </div>
            <div className="row">
              <div className="col-sm-5">

                <ThreadList
                  data={this.state.threads}
                  onThreadClick={this.onThreadClick}
                />

              </div>

              <div className="col-sm-7">

                {displayMessages}

              </div>
            </div>
        </div>
      </div>
    )
  }

});


export default MessageDisplay;
