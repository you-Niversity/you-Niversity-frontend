'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import CourseDisplay from './course-display.js';
import Navbar from '../navbar.js';
import NavbarLoggedIn from '../navbar-logged-in.js';
import WelcomeText from './welcome-text.js';
import SearchBar from './search-bar.js';
import Footer from '../footer.js';
import { connect } from 'react-redux';
import store from '../../store';
import { userLoginSuccess } from '../../actions/user-actions';
import Loading from 'react-loading';
import Modal from 'boron/OutlineModal';
import modalStyles from '../styles/modal-styles.js';


var LandingPage = React.createClass({

  getInitialState: function() {

    return {
      lat: null,
      lng: null,
      radius: 0.08335,
      zoom: 3,
      city: 'Fort Collins',
      state: 'CO',
      filterText: ''
    };
  },

  componentDidMount: function(){
    console.log(sessionStorage);
    this.getUserLocation(this.geocodeLatLng);
    if((!this.props.userState.profile) && (sessionStorage.user_id)) {
      this.props.login({profile: {first_name: sessionStorage.first_name, user_id: sessionStorage.user_id}});
    }
  },

  handleUserInput: function(filterText){
    this.setState({
      filterText: filterText
    });
  },

  handleRadiusInput: function(radius){
    var data = JSON.parse(radius);
    this.setState({
      radius: data.radius, zoom: data.zoom
    });
  },

  getUserLocation: function(callback){
    if(sessionStorage.getItem('city')) {
      var city = sessionStorage.getItem('city');
      var state = sessionStorage.getItem('state');
      var lat = sessionStorage.getItem('lat');
      var lng = sessionStorage.getItem('lng');
      this.setState({city: city, state: state, lat: lat, lng: lng});
    } else {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.setState({lat: Number(position.coords.latitude), lng: Number(position.coords.longitude)});
        callback();
      }.bind(this), this.showModal, {timeout: 10000});
    };
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
          console.log('No results found.');
          this.showModal();
        }
      } else {
        console.log('the geocoder failed...', status);
        this.showModal();
      }
    }.bind(this));
  },

  showModal: function(){
      this.refs.modal.show();
      this.setState({lat:40.588476, lng:-105.074212});
  },
  hideModal: function(){
      this.refs.modal.hide();
  },

  handleLocationInput: function(suggest){
    this.setState({lat:suggest.location.lat, lng:suggest.location.lng, city:suggest.gmaps.address_components[0].long_name, state: suggest.gmaps.address_components[2].long_name});
  },

  render: function(){

    var spinStyle = {
      marginLeft: '40%'
    }

    var searchOrSpin = (this.state.lat === null) ?
      <div style={spinStyle}><Loading style={spinStyle} type='spinningBubbles' color='#e3e3e3' /></div>
      : <SearchBar
        filterText={this.state.filterText}
        handleUserInput={this.handleUserInput}
        radius={this.state.radius}
        handleRadiusInput={this.handleRadiusInput}
        handleLocationInput={this.handleLocationInput}
        lat={this.state.lat}
        lng={this.state.lng}
        city={this.state.city}
        state={this.state.state}
      />;

    var loggedInNav = (sessionStorage.first_name) ?
      <NavbarLoggedIn />
      : null;

    var nav = (!sessionStorage.first_name) ?
      <Navbar />
      : null;

    return (
        <div className="container-fluid">
          <div id="landing-div">
            <Modal ref="modal" style={modalStyles.container}>
                <h2 style={modalStyles.title}>We tried to find your location, <br /> but something went wrong. <br /> Type a location in the search bar below to narrow your results.</h2>
                <button style={modalStyles.btn} onClick={this.hideModal}>Close</button>
            </Modal>
            <div id="landing-div-row" className="row">
              <div className="col-sm-2"></div>
              <div id="center-content" className="col-sm-8">
                {loggedInNav}
                {nav}
                <WelcomeText />
                {searchOrSpin}

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

const mapStateToProps = function(store) {
  return store;
}
const mapDispatchToProps = function(dispatch){
  return {
    login: function(user){
      dispatch(userLoginSuccess(user));
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LandingPage);
