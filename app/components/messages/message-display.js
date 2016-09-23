'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import Modal from 'boron/OutlineModal';
import modalStyles from '../styles/modal-styles.js';
import { connect } from 'react-redux';
import store from '../../store';

var MessageDisplay = React.createClass({

  getInitialState: function(){
    return({

    })
  },

  componentDidMount: function(){
    console.log('component mounted!');
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

    return (
      <div className="row" style={messageBoxStyle}>
          <h1 style={headerStyle}>Inbox</h1>
      </div>
    )
  }

});


export default MessageDisplay;
