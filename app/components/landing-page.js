'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseDisplay from './courses/course-display.js';
import Navbar from './navbar.js';
import NavbarLoggedIn from './navbar-logged-in.js';


var LandingPage = React.createClass({

  getInitialState: function() {

    return {
      lat: null,
      lng: null,
      radius: 0.1667,
      zoom: 10,
      city: 'getting',
      state: 'location',
      filterText: ''
    };
  },

  handleUserInput: function(filterText){
    console.log(filterText);
    this.setState({
      filterText: filterText
    });
  },

  handleRadiusInput: function(radius){
    console.log(this.state);
    var data = JSON.parse(radius);
    console.log(data);
    this.setState({
      radius: data.radius, zoom: data.zoom
    });
  },

  getUserLocation: function(callback){
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({lat: Number(position.coords.latitude), lng: Number(position.coords.longitude)});
      callback();
    }.bind(this));
  },


  geocodeLatLng: function() {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(this.state.lat, this.state.lng);

    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          var city = results[0].address_components[2].long_name;
          var state = results[0].address_components[4].short_name;

          this.setState({city: city, state: state});
          sessionStorage.setItem('city', city);
          sessionStorage.setItem('state', state);
          sessionStorage.setItem('lat', this.state.lat);
          sessionStorage.setItem('lng', this.state.lng);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    }.bind(this));
  },

  componentDidMount: function(){
    if(sessionStorage.getItem('city')) {
      var city = sessionStorage.getItem('city');
      var state = sessionStorage.getItem('state');
      var lat = sessionStorage.getItem('lat');
      var lng = sessionStorage.getItem('lng');
      this.setState({city: city, state: state, lat: lat, lng: lng});
    } else {
      this.getUserLocation(this.geocodeLatLng);
    }
  },

  render: function(){
    var loggedInNav = (sessionStorage.first_name) ?
      <NavbarLoggedIn />
      : null;

    var nav = (!sessionStorage.first_name) ?
      <Navbar />
      : null;
    return (
      <div className="container-fluid">
        <div id="landing-div">
          <div id="landing-div-row" className="row">
            <div className="col-sm-2"></div>
            <div id="center-content" className="col-sm-8">
              {loggedInNav}
              {nav}
              <WelcomeText />
              <SearchBar
                filterText={this.state.filterText}
                handleUserInput={this.handleUserInput}
                radius={this.state.radius}
                handleRadiusInput={this.handleRadiusInput}
                city={this.state.city}
                state={this.state.state}
              />
            </div>
          </div>
        </div>
        <CourseDisplay
          filterText={this.state.filterText}
          lat={this.state.lat}
          lng={this.state.lng}
          radius={this.state.radius}
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

  getInitialState: function(){
    return {
      radius: this.props.radius
    };
  },

  handleChange: function() {
    this.props.handleUserInput(
      this.refs.filterTextInput.value
    )
  },

  handleRadiusChange: function() {
    this.props.handleRadiusInput(
      this.refs.radiusInput.value
    )
    this.setState({radius: this.refs.radiusInput.value});
  },

  render: function() {
    return (
      <div id="landing-search-div" className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <div id="search-bar" className="row" data-arbitrary="stuff">
            <div className="col-sm-5">
              <form>
                <input
                  type="text"
                  placeholder=" Search courses"
                  value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange} />
              </form>
            </div>
            <div className="col-sm-7">
              <h4>within
                <select value={this.state.radius} ref="radiusInput" onChange={this.handleRadiusChange}>
                  <option value='{"radius":0.08335, "zoom":8}'>5</option>
                  <option value='{"radius":0.1667, "zoom":10}'>10</option>
                  <option value='{"radius":0.25005, "zoom":12}'>15</option>
                  <option value='{"radius":0.41675, "zoom":15}'>25</option>
                  <option value='{"radius":0.8335, "zoom":17}'>50</option>
                </select>
                miles of {this.props.city}, {this.props.state}
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default LandingPage;
