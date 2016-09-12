'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';

var SingleCourseDisplay = React.createClass({

  getInitialState: function(){
    return {
      courseData: [],
      roster: [],
      instructorReviews: []
    };
  },

  getCourseDataFromAPI: function(){
    request
      .get("http://localhost:8080/classes/4")
      .end(function(err, res){
        if(err){
          console.log("There was an error grabbing this course from the API");
        } else {
          this.setState({courseData: res.body[0]});
        }
      }.bind(this))
  },

  getRosterFromAPI: function(){
    request
      .get("http://localhost:8080/rosters/4")
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
    this.getCourseDataFromAPI();
    this.getRosterFromAPI();
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
    //var date = 'September 24th, 2016'; //(this.props.data.date).toLocaleDateString('en-US');
    return (
      <div className="left-course-display center">
        <p className="bold">September 24th, 2016</p>
        <p>6a.m. to 8a.m.</p>
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
          <p>{this.props.data.first_name} {this.props.data.last_name}</p>
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
      console.log(student);
      return (
        <Student>
          first_name={student.first_name}
          last_name={student.last_name}
          profile_pic={student.profile_pic}
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
          <div className="col-sm-8">
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
