'use strict';
import React from 'react';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseList from './courses/course-list.js';
import { connect } from 'react-redux';

var DATABASE_URL ="https://you-niversity-postgresql.herokuapp.com";

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
      .get(DATABASE_URL + "/users/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({userData: res.body[0]})
        }
      }.bind(this))
  },

  getClassesTeachingFromAPI: function(id){
    request
      .get(DATABASE_URL + "/users/" + id + "/teaching")
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({classesTeaching: res.body})
        }
      }.bind(this))
  },

  getClassesTakingFromAPI: function(id){
    request
      .get(DATABASE_URL + "/users/" + id + "/taking")
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({classesTaking: res.body})
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
      <div className="dashboard-display">
        <div className="teaching-block">{teachingDisplay}</div>
        <div className="taking-block">{takingDisplay}</div>
      </div>
      </div>
    );
  }
});

const mapStateToProps = function(store) {
  return store;
}

module.exports = connect(mapStateToProps)(UserDashboard);
