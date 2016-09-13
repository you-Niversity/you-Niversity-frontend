'use strict';
import React from 'react';
import request from 'superagent';


var UserDashboard = React.createClass({

  getInitialState: function(){
    return {
      userData: [],
      classesTeaching: [],
      classesTaking: []
    };
  },

  getUserDataFromAPI: function(id){
    request
      .get("http://localhost:8080/users" + id)
      .end(function(err, res){
        if(err){
          console.log("error getting user data");
        } else {
          this.setState({userData: res.body[0]})
          console.log(this.state);
        }
      }.bind(this))
  },

  getClassesTeachingFromAPI: function(id){
    console.log("write the request");
  },

  getClassesTakingFromAPI: function(id){
    console.log("write the request");
  },

  componentDidMount: function(){
    this.getUserDataFromAPI(4);
  },

  render: function(){
    return (
      <div>
        <p>{this.state.userData}</p>
      </div>
    );
  }
});


export default LoginDisplay;
