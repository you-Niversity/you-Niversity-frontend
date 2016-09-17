'use strict';
import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseList from './courses/course-list.js';

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
      .get("http://localhost:8080/users/" + id)
      .end(function(err, res){
        if(err){
          console.log("error getting user data");
        } else {
          this.setState({userData: res.body[0]})
          console.log(this.state.userData);
        }
      }.bind(this))
  },

  getClassesTeachingFromAPI: function(id){
    request
      .get("http://localhost:8080/users/" + id + "/teaching")
      .end(function(err, res){
        if(err){
          console.log("error getting user data");
        } else {
          this.setState({classesTeaching: res.body})
          console.log(this.state.classesTeaching);
        }
      }.bind(this))
  },

  getClassesTakingFromAPI: function(id){
    request
      .get("http://localhost:8080/users/" + id + "/taking")
      .end(function(err, res){
        if(err){
          console.log("error getting user data");
        } else {
          this.setState({classesTaking: res.body})
          console.log(this.state.classesTaking);
        }
      }.bind(this))
  },

  componentDidMount: function(){
    var id = this.props.params.id;
    this.getUserDataFromAPI(id);
    this.getClassesTeachingFromAPI(id);
    this.getClassesTakingFromAPI(id);
  },

  render: function(){

    var teachingDisplay = (this.state.classesTeaching.length > 0) ?
    <CourseList
      data={this.state.classesTeaching}
      header="Classes You're Teaching"
    /> :
    null;

    var takingDisplay = (this.state.classesTaking.length > 0) ?
    <CourseList
      data={this.state.classesTaking}
      header="Classes You're Taking"
    /> :
    null;

    return (
      <div>
      <div className="CourseDisplay dashboard-display">
        {teachingDisplay}
        {takingDisplay}
      </div>
      </div>
    );
  }
});


export default UserDashboard;
