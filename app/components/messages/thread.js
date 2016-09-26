'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import TrashIcon from '../icons/trash-icon.js';
import request from 'superagent';

var DATABASE_URL ="https://you-niversity-postgresql.herokuapp.com";

var Thread = React.createClass({

  getInitialState: function(){
    return {
      unread_messages: this.props.unread,
      messages: []
    }
  },

  componentDidMount: function(){
    this.getMessageDataFromAPI();
  },

  getMessageDataFromAPI: function(){
    request
      .get(DATABASE_URL + "/messages/thread/" + this.props.id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({messages: res.body});
          if ((this.state.messages.length === 1 && this.state.messages[0].sender_id == Number(sessionStorage.user_id))) {
            this.setState({unread_messages: false});
          }
        }
      }.bind(this))
  },

  onThreadClick: function(){
    this.setState({unread_messages: false});
    this.props.onThreadClick(this.props.id);
    this.updateThreadMessageStatusInDatabase(this.props.id);
  },

  updateThreadMessageStatusInDatabase: function(thread_id){
    request
      .put(DATABASE_URL + "/messages/thread/" + thread_id)
      .send({unread_messages: false})
      .end(function(err, res){
        if (err || !res.ok) {
          console.log("there was an error");
          browserHistory.push('/error');
        } else {
          console.log("next, re-render the navbar somehow...");
        }
      });
  },

  onTrashClick: function(){
    this.props.onTrashClick(this.props.id);
  },

  render: function(){

    var profilePic = {
      backgroundImage: 'url(' + this.props.sender_profile_pic + ')',
    }

    var selected = (this.state.unread_messages) ?
        <div onClick={this.onThreadClick} className="row single-thread selected-thread">

          <div className="col-sm-2 message-sender-pic" style={profilePic}></div>
          <div className="col-sm-8">
            <h3 className="new-message">new message!</h3>

            <h2>{this.props.sender_first_name} {this.props.sender_last_name}</h2>
            <h3>{this.props.title}</h3>
          </div>
          <div className="col-sm-2" onClick={this.onTrashClick}>
            <TrashIcon />
          </div>
        </div>
    :
        <div onClick={this.onThreadClick} className="row single-thread">
          <div className="col-sm-2 message-sender-pic" style={profilePic}></div>
          <div className="col-sm-8">
            <h2>{this.props.sender_first_name} {this.props.sender_last_name}</h2>
            <h3>{this.props.title}</h3>
          </div>
          <div className="col-sm-2" onClick={this.onTrashClick}>
            <TrashIcon />
          </div>
        </div>

    return (
      <div>
        {selected}
      </div>
    )
  }
})

export default Thread;
