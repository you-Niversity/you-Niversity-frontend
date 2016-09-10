'use strict';

import React from 'react';

var SignupDisplay = React.createClass({
  handleUserSubmit: function(user){
    $.ajax({
      url: 'http://localhost:3000/auth/signup',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data){
        console.log('Successfully added user');
      }.bind(this),
      error: function(xhr, status, err){
        console.log('http://localhost:3000/auth/signup', status, err.toString());
      }.bind(this)
    });
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4 form-display">
          <div className="signup-display">
            <input type="submit" value="Sign Up with Google" className="google-signup form-submit-button"/>
            <AddUserForm
              onUserSubmit={this.handleUserSubmit}
            />
            <p>Already signed up? Login <a href="">here</a>.</p>
          </div>
        </div>
      </div>
    )
  }
});

var AddUserForm = React.createClass({
  getInitialState: function(){
    return({first_name: '', last_name: '', email: '', profile_pic: '', city: '', state: '', password: '', confirm_password: ''})
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
    if(!first_name || !last_name || !email || !password){
      console.log('some fields are missing');
      return;
    }
    this.props.onUserSubmit({
      first_name: first_name,
      last_name: last_name,
      email: email,
      profile_pic: profile_pic,
      city: city,
      state: state,
      password: password
    });
    this.setState({first_name: '', last_name: '', email: '', profile_pic: '', city: '', state: '', password: '', confirm_password: ''})
  },
  render: function() {
    return (
      <form className="addUserForm"           onSubmit={this.handleSubmit}>
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
        <input type="submit" value="Sign Up"/>
      </form>
    )
  }
});

export default SignupDisplay;
