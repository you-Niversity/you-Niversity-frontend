'use strict';
import React from 'react';
import nocache from 'superagent-no-cache';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import AddCourseDisplay from './add-course-display.js';

{/*var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    )
  },
  render: function() {
    return (
      <div id="landing-search-div" className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <div id="search-bar" className="row">
            <div className="col-sm-6">
              <form>
                <input
                  type="text"
                  placeholder="Search courses"
                  value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <div className="col-sm-6"><h4>within 25 miles of Loveland, CO</h4></div>
          </div>
        </div>
      </div>
    )
  }
});*/}


var CourseDisplay = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      filterText: ''
    };
  },

  handleUserInput: function(filterText){
    this.setState({
      filterText: filterText
    });
  },

  getCoursesFromAPI: function() {
    request
      .get("http://localhost:8080/classes")
      .end(function(err, res){
        if (err){
          console.log('There was an error grabbing the classes from the API.');
        } else {
          this.setState({data: res.body});
        }
      }.bind(this))
  },

  componentDidMount: function() {
    this.getCoursesFromAPI();
  },

  render: function() {
    return (
      <div className="CourseDisplay">
        {/*<SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />*/}
        {/*<AddCourseForm onCourseSubmit={this.handleCourseSubmit}/>*/}
        <CourseList
          data={this.state.data}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
});

var CourseList = React.createClass({
  render: function() {

    var courseNodes = this.props.data.map(function(course) {
      if ((this.props.filterText !== '' && course.title.indexOf(this.props.filterText) === -1)){
        console.log('if');
        return;
      };
      return (
        <Course
          title={course.title}
          image_url={course.image_url}
          date={course.date}
          key={course.id}
          id={course.id}>
        </Course>
      )
    }.bind(this));

    return (
      <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8" id="class-display">
            <div className="row"><h3>Upcoming Classes</h3></div>
            <div id="course-block" className="row">
              {courseNodes}
            </div>
          </div>
      </div>

    );
  }
});

var Course = React.createClass({

  render: function() {
    var courseStyle = {
      backgroundImage: 'url(' + this.props.image_url + ')',
    }

    return (
      <Link to={'/courses/'+this.props.id}><div style={courseStyle} className="single-course">
        <div className="single-course-text">
          <p>{this.props.date}</p>
          <hr/>
          <h4 className="courseTitle">{this.props.title}</h4>
        </div>
      </div></Link>
    );
  }
});

export default CourseDisplay;
