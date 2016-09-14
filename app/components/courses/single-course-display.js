'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var SingleCourseDisplay = React.createClass({

  getInitialState: function(){
    return {
      courseData: [],
      roster: [],
      instructorReviews: []
    };
  },

  getCourseDataFromAPI: function(id){
    request
      .get("http://localhost:8080/classes/" + id)
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing this course from the API");
        } else {
          console.log(res.body[0].user_id);
          this.setState({courseData: res.body[0]});
        }
      }.bind(this))
  },

  getRosterFromAPI: function(id){
    request
      .get("http://localhost:8080/rosters/" + id)
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing this roster from the API");
        } else {
          console.log(res.body);
          this.setState({roster: res.body});
        }
      }.bind(this))
  },

  getInstructorReviewsFromAPI: function(){
    console.log('write api request');
  },

  componentDidMount: function(){
    console.log("****");
    console.log(this.props.params.id);
    var id = this.props.params.id;
    this.getCourseDataFromAPI(id);
    this.getRosterFromAPI(id);
    this.getInstructorReviewsFromAPI();
  },

  render: function(){
    return (
        <div>
          <div className="row" id="single-course-display">
            <div className="col-sm-3 no-padding">
              <CourseDateTimePlaceInstructorDisplay
                data={this.state.courseData}
              />
            </div>
            <div className="col-sm-7">
              <TitleDescriptionPrereqDisplay
                data={this.state.courseData}
              />
            </div>
            <div className="col-sm-2 no-padding">
              <RightDisplay
                data={this.state.courseData}
              />
            </div>
          </div>
          <RosterList
            data={this.state.roster}
          />
        </div>
    );
  }
});

var CourseDateTimePlaceInstructorDisplay = React.createClass({
  render: function(){
    console.log(this.props.data.date);
    return (
      <div className="left-course-display center">
        <p className="bold">{this.props.data.date}</p>
        <p>{this.props.data.start_time} to {this.props.data.end_time}</p>
        <p className="bold">{this.props.data.address}</p>
        <p>{this.props.data.city}, {this.props.data.state}</p>
        <div className="btn-div">${this.props.data.price}</div>
      </div>
    );
  }
});

var TitleDescriptionPrereqDisplay = React.createClass({
  render: function(){
    return (
      <div>
        <div id="title-container"><h2 id="course-title">{this.props.data.title}</h2></div>
        <p id="course-description">{this.props.data.description}</p>
        <hr />
        <p id="course-prereqs"><span className="bold">Prerequisites: </span>{this.props.data.prerequisites}</p>
        <hr />
      </div>
    );
  }
});

var RightDisplay = React.createClass({
  render: function(){
    return (
      <div>
        <div className="btn-div">Sign Up</div>
        <div className="btn-div">{this.props.data.seats_remaining} seats left</div>
        <TaughtBy
          data={this.props.data}
        />
      </div>
    );
  }
});

var TaughtBy = React.createClass({
  render: function(){

    var instructorImageStyle = {
      backgroundImage: 'url(' + this.props.data.profile_pic + ')',
    }

    return (
        <div className="center" id="taught-by">
          <p className="bold">Your Instructor</p>
          <Link to={'/users/'+this.props.data.user_id}><p>{this.props.data.first_name} {this.props.data.last_name}</p></Link>
          <div className="instructor-profile-img" style={instructorImageStyle}></div>
        </div>
    );
  }
});

var RosterList = React.createClass({
  render: function(){
    console.log("*****");
    console.log(this.props.data[0]);

    var rosterNodes = this.props.data.map(function(student){
      return (
        <Student
          first_name={student.first_name}
          last_name={student.last_name}
          profile_pic={student.profile_pic}
          key={student.id}>
        </Student>
      )
    }.bind(this));

    return (
      <div id="roster-div">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="center">Your Classmates</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 roster-list">
            <div className="row">
              {rosterNodes}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Student = React.createClass({

  render: function(){

    var studentImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')',
    }

    return (
      <div className="col-sm-3">
        <p className="center">{this.props.first_name} {this.props.last_name}</p>
        <div className="student-profile-img center" style={studentImageStyle}></div>
      </div>
    )
  }
});


export default SingleCourseDisplay;
