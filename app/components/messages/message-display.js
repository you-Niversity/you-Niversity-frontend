'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import { connect } from 'react-redux';
import store from '../../store';
import Modal from 'boron/OutlineModal';
import modalStyles from '../styles/modal-styles.js';
import ThreadList from './thread-list.js';
import MessageList from './message-list.js';

var DATABASE_URL ="http://localhost:8080";

var MessageDisplay = React.createClass({

  getInitialState: function(){
    return({
      threads: [],
      messages: [],
      currentThread: null,
      class_id: null
    })
  },

  componentDidMount: function(){
    console.log(this.props.messageState);
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
    console.log(id);
    request
      .get(DATABASE_URL + "/messages/thread/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          console.log(res.body);
          this.setState({messages: res.body, currentThread: res.body[0].thread_id});
        }
      }.bind(this))
  },

  deleteThread: function(id){
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

  handleMessageSubmit: function(message){
    var id = this.props.params.id;
    var thread_id = this.state.currentThread;
    var index = this.state.messages.length - 1;
    var recipient_id = this.state.messages[index].sender_id;
    request
      .post(DATABASE_URL + "/messages/" + id)
      .send({message: message})
      .send({thread_id: thread_id})
      .send({recipient_id: recipient_id})
      .end(function(err, res){
        if(err || !res.ok) {
          console.log("there was an error submitting this comment.");
        } else {
          this.getMessageDataFromAPI(thread_id);
        }
      }.bind(this))
  },

  render: function(){

    return (
      <div className="message-box">
        <div className="row message-header">
            <div className="row inbox-header">
              <h1 >Inbox</h1>
            </div>
            <div className="row">
              <div className="col-sm-5">
                <ThreadList
                  data={this.state.threads}
                  messages={this.state.messages}
                  onThreadClick={this.onThreadClick}
                  deleteThread={this.deleteThread}
                />
              </div>
              <div className="col-sm-7">
                <MessageList
                  data={this.state.messages}
                  handleMessageSubmit={this.handleMessageSubmit}
                />
              </div>
            </div>
            <div className="row message-footer"></div>
        </div>
      </div>
    )
  }
});

const mapStateToProps = function(store) {
  return store;
}

module.exports = connect(mapStateToProps)(MessageDisplay);
