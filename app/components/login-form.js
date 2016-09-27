'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import { connect } from 'react-redux';
import store from '../store';
import { userLoginSuccess } from '../actions/user-actions';
import { unreadMessages } from '../actions/message-actions';
import Modal from 'boron/OutlineModal';
import modalStyles from './styles/modal-styles.js';

var DATABASE_URL ="https://you-niversity-postgresql.herokuapp.com";

 var LoginDisplay = React.createClass({

  getInitialState: function(){
    return({
      loginErrorMessage: null,
      err: false,
    })
  },

  handleLoginSubmit: function(user){
    request
      .post(DATABASE_URL + "/auth/login")
      .send(user)
      .end(function(err, res){
        if (err || !res.ok) {
          var errorMessage = JSON.parse(res.text).message;
          this.setState({loginErrorMessage: errorMessage, err: true});
        } else {
          if (!res.body.token) {
            this.setState({loginErrorMessage: 'Sorry, but there was a problem in loggin you in.', err: true})
          } else {
            this.props.login(res.body);
            sessionStorage.setItem('first_name', this.props.userState.profile.first_name);
            sessionStorage.setItem('user_id', this.props.userState.profile.id);
            sessionStorage.setItem('image_url', res.body.profile.profile_pic);
            this.checkForUnreadMessages();
            this.showModal();
          }
        }
      }.bind(this));
  },

  checkForUnreadMessages: function(){
      request
        .get(DATABASE_URL + "/messages/unread/" + sessionStorage.user_id)
        .end(function(err, res){
          if (err){
            console.log('where is the roster?');
          } else {
            sessionStorage.setItem('unreadMessagesExist', res.body.unread_messages);
            this.props.checkForUnreadMessages(res.body.unread_messages);
          }
        }.bind(this))
    },

  showModal: function(){
      this.refs.modal.show();
  },
  hideModal: function(){
      this.refs.modal.hide();
      browserHistory.goBack();
  },

  render: function(){
    return (
      <div className="row margin-bottom">
        <Modal ref="modal" style={modalStyles.container}>
            <h2 style={modalStyles.title}>Login successful!</h2>
            <button style={modalStyles.btn} onClick={this.hideModal}>Close</button>
        </Modal>
        <div className="col-sm-4"></div>
        <div className="col-sm-4 form-display login-form-display">
          <div className="login-display">
            <UserLoginForm
              onLoginSubmit={this.handleLoginSubmit}
              loginErrorMessage={this.state.loginErrorMessage}
              err={this.state.err}
            />
            <p>Not signed up yet? <Link to="/signup"> Create an account!</Link></p>
          </div>
        </div>
      </div>
    );
  }
});

var UserLoginForm = React.createClass({
  getInitialState: function(){
    return ({email: '', password: ''})
  },
  handleEmailChange: function(event){
    this.setState({email: event.target.value})
  },
  handlePasswordChange: function(event){
    this.setState({password: event.target.value})
  },

  handleSubmit: function(event){
    event.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();

    if(!email || !password){
      console.log('some fields are missing');
      return;
    }

    this.props.onLoginSubmit({
      email: email,
      password: password
    });

    this.setState({
      email: '',
      password: ''
    });
  },

  render: function(){

    var errMessage = (this.props.err) ? <p className="error-message">{this.props.loginErrorMessage}</p> : null;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          required
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="password"
          required
          placeholder="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        {errMessage}
        <input type="submit" value="Login" className="btn-success form-submit-button"/>
      </form>
    )
  }
});

const mapStateToProps = function(store) {
  return store;
}
const mapDispatchToProps = function(dispatch){
  return {
    login: function(user){
      dispatch(userLoginSuccess(user));
    },
    checkForUnreadMessages: function(unread) {
      dispatch(unreadMessages(unread))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginDisplay);
