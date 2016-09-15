'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseDisplay from './courses/course-display.js';
import Navbar from './navbar.js';

var LandingPage = React.createClass({

  getInitialState: function() {
    return {
      lat: 0,
      lng: 0
    };
  },

  getUserLocation: function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
      console.log(this.state);
    }.bind(this));
  },







  componentDidMount: function(){
    this.getUserLocation();
  },

  render: function(){
    return (
      <div className="container-fluid">
        <div id="landing-div">
          <div id="landing-div-row" className="row">
            <div className="col-sm-2"></div>
            <div id="center-content" className="col-sm-8">
              <Navbar />
              <WelcomeText />
              <SearchBar />
            </div>
          </div>
        </div>
        <CourseDisplay />
      </div>
    );
  }
});

var WelcomeText = React.createClass({

  render: function(){
    return (
      <div id="landing-message" className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <h3>whether we teach or be taught</h3>
          <h2>We never stop teaching and learning from each other</h2>
        </div>
      </div>
    );
  }
});

var SearchBar = React.createClass({

  render: function() {
    return (
      <div id="landing-search-div" className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <div id="search-bar" className="row" data-arbitrary="stuff">
            <div className="col-sm-6">
              <form>
                <input
                  type="text"
                  placeholder="Search courses" />

                  {/* value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange}*/}

              </form>
            </div>
            <div className="col-sm-6"><h4>within 25 miles of Loveland, CO</h4></div>
          </div>
        </div>
      </div>
    )
  }
});

export default LandingPage;
