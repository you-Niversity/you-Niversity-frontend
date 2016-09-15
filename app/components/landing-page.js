'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseDisplay from './courses/course-display.js';
import Navbar from './navbar.js';

var LandingPage = React.createClass({

  getInitialState: function() {
    return {
      lat: 0,
      lng: 0,
      city: null,
      state: null,
      filterText: ''
    };
  },

  handleUserInput: function(filterText){
    console.log(filterText);
    this.setState({
      filterText: filterText
    });
  },

  getUserLocation: function(callback){
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
      callback();
    }.bind(this));
  },


  geocodeLatLng: function() {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.588507799999995,-105.0742159);

    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          var city = results[0].address_components[2].long_name;
          var state = results[0].address_components[4].short_name;

          this.setState({city: city, state: state});
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    }.bind(this));
  },

  componentDidMount: function(){
    this.getUserLocation(this.geocodeLatLng);
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
              <SearchBar
                filterText={this.state.filterText}
                handleUserInput={this.handleUserInput}
                city={this.state.city}
                state={this.state.state}
              />
            </div>
          </div>
        </div>
        <CourseDisplay
          filterText={this.state.filterText}
        />
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

  handleChange: function() {
    this.props.handleUserInput(
      this.refs.filterTextInput.value
    )
  },

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
                  placeholder="Search courses"
                  value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange} />
              </form>
            </div>
            <div className="col-sm-6"><h4>within 25 miles of {this.props.city}, {this.props.state}</h4></div>
          </div>
        </div>
      </div>
    )
  }
});

export default LandingPage;
