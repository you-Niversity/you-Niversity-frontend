'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';

var LoginDisplay = React.createClass({

  handleLoginSubmit: function(user){
    console.log(user);
    request
      .post("http://localhost:8080/auth/login")
      .send(user)
      .end(function(err, res){
        if (err || !res.ok) {
          console.log("there was an error in logging in this user");
        } else {
          console.log("successfully logged in user");
          location.href = '/';
        }
      });
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4 form-display">
          <div className="login-display">
            <UserLoginForm
              onLoginSubmit={this.handleLoginSubmit}
            />
            <input type="submit" value="Login with Google" className="google-login form-submit-button"/>
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
    return (
      <form className="userLoginForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="text"
          placeholder="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <input type="submit" value="Login" className="form-submit-button"/>
      </form>
    )
  }
});

export default LoginDisplay;
