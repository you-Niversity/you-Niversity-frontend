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
      marginBottom: '20px'
    }

    var mapMarkers = this.props.data.map(function(marker){
      return (
        <Marker>
          lat={marker.lat}
          lng={marker.lng}
          key={"marker:" + marker.id}
          id={marker.id}
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

  render() {
    var MARKER_SIZE = 40;
    var markerStyle = {
      position: 'absolute',
      width: MARKER_SIZE,
      height: MARKER_SIZE,
      left: -MARKER_SIZE / 2,
      top: -MARKER_SIZE / 2,
      width: '20px',
      height: '20px',
      backgroundColor: 'orange',
      color: 'orange',
      fontSize: '3em',
      fontWeight: '700',
      border: '2px solid lightgray',
      borderRadius: '100%'
    }

    return (
       <div style={markerStyle}></div>
    );
  }
});

export default MapDisplay;
