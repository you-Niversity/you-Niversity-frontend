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
      messages: [],
    })
  },

  componentDidMount: function(){
    var id = this.props.params.id;
    this.getThreadDataFromAPI(id, this.getMessageDataFromAPI);
  },

  getThreadDataFromAPI: function(id, callback){
    request
      .get(DATABASE_URL + "/messages/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({threads: res.body});
          callback(res.body[0].thread_id)
        }
      }.bind(this))
  },

  onThreadClick: function(id){
    this.getMessageDataFromAPI(id);
  },

  getMessageDataFromAPI: function(id){
    request
      .get(DATABASE_URL + "/messages/thread/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({messages: res.body});
        }
      }.bind(this))
  },

  deleteThread: function(id){
    console.log(id);
    request
      .del(DATABASE_URL + "/messages/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.getThreadDataFromAPI(this.props.params.id, this.getMessageDataFromAPI);
        }
      }.bind(this))
  },

  render: function(){

    var messageBoxStyle = {
      border: "2px solid orange",
      margin: "65px 0 75px 0",
      width: "100%",
    }

    var headerStyle = {
      color: "orange",
      fontSize: "2.5em",
      fontWeight: "700",
      padding: "10px"
    }
    var footerStyle={
      backgroundColor: "orange",
      height: '20px',
      marginRight: '0px'
    }

    var noMargins = {
      margin: '0 0 0 15px'
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
                  deleteThread={this.deleteThread}
                />

              </div>

              <div className="col-sm-7">

                {displayMessages}

              </div>
            </div>

            <div className="row" style={footerStyle}>
            </div>
        </div>
      </div>
    )
  }

});


export default MessageDisplay;
