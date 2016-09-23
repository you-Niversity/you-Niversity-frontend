'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import { connect } from 'react-redux';
import store from '../store';
import { userLoginSuccess } from '../actions/user-actions';
import Modal from 'boron/OutlineModal';
import modalStyles from './styles/modal-styles.js';

var DATABASE_URL = "https://you-niversity-postgresql.herokuapp.com";

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
          this.props.login(res.body);

          sessionStorage.setItem('first_name', this.props.userState.profile.first_name);
          sessionStorage.setItem('user_id', this.props.userState.profile.id);
          sessionStorage.setItem('image_url', res.body.profile.profile_pic);

          this.showModal();
        }
      }.bind(this));
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
        <div className="col-sm-4 form-display">
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
    {/*console.log(this.props.loginErrorMessage !== null);
    console.log(this.props.err);*/}


    if(!email || !password){
      console.log('some fields are missing');
      return;
    }

    if(this.props.loginErrorMessage !== null) {
      console.log('form component sees error wooooo');
      return;
    } else {
      this.props.onLoginSubmit({
        email: email,
        password: password
      });
    }

    this.setState({
      email: '',
      password: ''
    });
  },

  render: function(){
    {/*console.log(this.props.loginErrorMessage);
    console.log(this.props.err);*/}

    var errorMessageStyle = {
      color: 'red',
      fontWeight: 'bold',
      margin: '10px 0'
    }

    var errMessage = (this.props.err) ? <p style={errorMessageStyle}>{this.props.loginErrorMessage}</p> : null;

    return (
      <form className="userLoginForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        {errMessage}
        <input type="submit" value="Login" className="form-submit-button"/>
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
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginDisplay);
