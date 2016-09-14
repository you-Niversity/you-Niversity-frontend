'use strict';

import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';

var SignupDisplay = React.createClass({

  handleUserSubmit: function(user){
    console.log(user);
    request
      .post("http://localhost:8080/auth/signup")
      .send(user)
      .end(function(err, res){
        if (err || !res.ok) {
          console.log("there was an error in creating this user");
        } else {
          console.log("successfully created user");
          location.href = '/';
        }
      });
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10 form-display">
          <div className="signup-display">
            <input type="submit" value="Sign Up with Google" className="google-signup form-submit-button"/>
            <AddUserForm
              onUserSubmit={this.handleUserSubmit}
            />
            <p>Already signed up? Login <Link to="/login">here</Link>.</p>
          </div>
        </div>
      </div>
    )
  }
});

var AddUserForm = React.createClass({

  getInitialState: function(){
    return({first_name: '', last_name: '', email: '', profile_pic: '', city: '', state: '', password: '', confirm_password: '', passwordMatchingError: false, allFieldsRequiredError: false})
  },
  handleFirstNameChange: function(event){
    this.setState({first_name: event.target.value})
  },
  handleLastNameChange: function(event){
    this.setState({last_name: event.target.value})
  },
  handleEmailChange: function(event){
    this.setState({email: event.target.value})
  },
  handleProfilePicChange: function(event){
    this.setState({profile_pic: event.target.value})
  },
  handleCityChange: function(event){
    this.setState({city: event.target.value})
  },
  handleStateChange: function(event){
    this.setState({state: event.target.value})
  },
  handlePasswordChange: function(event){
    this.setState({password: event.target.value})
  },
  handleConfirmPasswordChange: function(event){
    this.setState({confirm_password: event.target.value})
  },
  handleSubmit: function(event){
    event.preventDefault();
    var first_name = this.state.first_name.trim();
    var last_name = this.state.last_name.trim();
    var email = this.state.email.trim();
    var profile_pic = this.state.profile_pic.trim();
    var city = this.state.city.trim();
    var state = this.state.state.trim();
    var password = this.state.password.trim();
    var confirm_password = this.state.confirm_password.trim();
    var passwordMatchingError = this.state.passwordMatchingError;
    var allFieldsRequiredError = this.state.allFieldsRequiredError;

    var required = function(){
      if(!first_name || !last_name || !email || !profile_pic || !city || !state || !password || !confirm_password){
        console.log('All fields required.');
        this.setState({allFieldsRequiredError: false});
      } else {
        this.setState({allFieldsRequiredError: false});
      }
    };

    var password = function(){
      if (password !== confirm_password) {
        console.log('Passwords don\'t match.');
        this.setState({passwordMatchingError: true})
      } else {
        this.setState({passwordMatchingError: false});
      }
    };

    var submit = function(){
      if (allFieldsRequiredError === true || passwordMatchingError === true) {
        console.log("An error needs to be addressed");
        return;
      } else {
        this.props.onUserSubmit({
          first_name: first_name,
          last_name: last_name,
          email: email,
          profile_pic: profile_pic,
          city: city,
          state: state,
          password: password
        });
      };
    }
    Promise.all([required(), password(), submit()]).then(function() {
        this.setState({first_name: '', last_name: '', email: '', profile_pic: '', city: '', state: '', password: '', confirm_password: '', passwordMatchingError: false, allFieldsRequiredError: false});
    }, function() {
      console.log('something failed');
    });
  },

  render: function() {

    var errorMessageStyle = {
      color: 'red',
      fontWeight: 'bold',
    }

    var passwordErrorMessage = (this.state.passwordMatchingError) ? <p style={errorMessageStyle}>*passwords do not match</p> : null;
    var requiredFieldsErrorMessage = (this.state.allFieldsRequiredError) ? <p style={errorMessageStyle}>*all fields required</p> : null;

    return (
      <form className="addUserForm" onSubmit={this.handleSubmit}>
      {passwordErrorMessage}
      {requiredFieldsErrorMessage}

      <div className="col-sm-6">
        <input
          type="text"
          placeholder="first name"
          value={this.state.first_name}
          onChange={this.handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="last name"
          value={this.state.last_name}
          onChange={this.handleLastNameChange}
        />
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="text"
          placeholder="profile picture url"
          value={this.state.profile_pic}
          onChange={this.handleProfilePicChange}
        />
      </div>
      <div className="col-sm-6">
        <input
          type="text"
          placeholder="city"
          value={this.state.city}
          onChange={this.handleCityChange}
        />
        <input
          type="text"
          placeholder="state"
          value={this.state.state}
          onChange={this.handleStateChange}
        />
        <input
          type="text"
          placeholder="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <input
          type="text"
          placeholder="confirm password"
          value={this.state.confirm_password}
          onChange={this.handleConfirmPasswordChange}
        />
      </div>
      <input type="submit" value="Sign Up"/>
      </form>
    )
  }
});

export default SignupDisplay;
