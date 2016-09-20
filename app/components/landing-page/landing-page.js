'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseDisplay from './course-display.js';
import Navbar from '../navbar.js';
import NavbarLoggedIn from '../navbar-logged-in.js';
import WelcomeText from './welcome-text.js';
import SearchBar from './search-bar.js';
import Footer from '../footer.js';


var LandingPage = React.createClass({

  getInitialState: function() {

    return {
      lat: null,
      lng: null,
      radius: 0.08335,
      zoom: 7,
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

  handleLocationInput: function(suggest){
    console.log("yippeeeee:");
    console.log(suggest);
    this.setState({lat:suggest.location.lat, lng:suggest.location.lng, city:suggest.gmaps.address_components[0].long_name, state: suggest.gmaps.address_components[2].long_name});
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
                handleLocationInput={this.handleLocationInput}
                lat={this.state.lat}
                lng={this.state.lng}
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


        <Footer />
      </div>
    );
  }
});


export default LandingPage;
