'use strict';
import React, {PropTypes, Component} from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

import GoogleMap from 'google-map-react';


var MapDisplay = React.createClass({

  render: function(){

    var mapStyle = {
      width: '76%',
      height: '400px',
      marginLeft: '12%',
      marginBottom: '50px'
    }

    var mapMarkers = this.props.data.map(function(marker, index){
      var filterTextLowerCase = this.props.filterText.toLowerCase();
      var markerTitleLowerCase = marker.title.toLowerCase();

      var radius = this.props.radius;
      var userLat = this.props.lat;
      var userLng = this.props.lng;
      var withinLatRadius = (marker.lat < (userLat + radius) && marker.lat > (userLat - radius));
      var withinLngRadius = (marker.lng > (userLng - radius) && marker.lng < (userLng + radius));
      var withinRadius = ((marker.lng > (userLng - radius) && marker.lng < (userLng + radius)) && (marker.lat < (userLat + radius) && marker.lat > (userLat - radius)));

      if ((this.props.filterText !== '' && markerTitleLowerCase.indexOf(filterTextLowerCase) === -1)){
        return;
      }

      if(withinRadius === false) {
        return;
      }

      return (
        <Marker
          lat={marker.lat}
          lng={marker.lng}
          key={"marker:" + marker.id}
          id={index + 1}>
          text={index + 1}
        </Marker>
      )
    }.bind(this));

    return (
      <div style={mapStyle} id="map">
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyDaVSO3W6l76rQI433gCNbvkdSAvkdKv4Y',
            language: 'en'
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          {mapMarkers}
        </GoogleMap>
      </div>
    );
  }

});

var Marker = React.createClass({

  propTypes: {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
  },

  render() {
    var markerStyle = {
      position: 'absolute',
      width: '32px',
      height: '32px',
      backgroundColor: 'orange',
      color: 'black',
      textAlign: 'center',
      fontSize: '2.5em',
      fontWeight: '700',
      border: '2px solid black',
      borderRadius: '100%'
    }
    var markerStyleHover = {
      position: 'absolute',
      width: '32px',
      height: '32px',
      backgroundColor: 'black',
      color: 'orange',
      textAlign: 'center',
      fontSize: '2.5em',
      fontWeight: '700',
      border: '2px solid orange',
      borderRadius: '100%'
    }

    const style = this.props.$hover ? markerStyleHover : markerStyle;

    return (
       <div style={style}>{this.props.id}</div>
    );
  }
});

export default MapDisplay;
