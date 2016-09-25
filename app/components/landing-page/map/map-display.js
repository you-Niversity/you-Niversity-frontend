'use strict';
import React, {PropTypes, Component} from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Marker from './marker.js';
import Item from './list-item.js';

import GoogleMap from 'google-map-react';


var MapDisplay = React.createClass({

  render: function(){

    var markerCount = 0;
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
      markerCount++;

      return (
        <Marker
          lat={marker.lat}
          lng={marker.lng}
          key={"marker:" + marker.id}
          order={markerCount}
          id={marker.id}>
        </Marker>
      )
    }.bind(this));

    var listCount = 0;
    var ListItems = this.props.data.map(function(item, index){
      var filterTextLowerCase = this.props.filterText.toLowerCase();
      var itemTitleLowerCase = item.title.toLowerCase();
      var radius = this.props.radius;
      var userLat = this.props.lat;
      var userLng = this.props.lng;
      var withinLatRadius = (item.lat < (userLat + radius) && item.lat > (userLat - radius));
      var withinLngRadius = (item.lng > (userLng - radius) && item.lng < (userLng + radius));
      var withinRadius = ((item.lng > (userLng - radius) && item.lng < (userLng + radius)) && (item.lat < (userLat + radius) && item.lat > (userLat - radius)));

      if ((this.props.filterText !== '' && itemTitleLowerCase.indexOf(filterTextLowerCase) === -1)){
        return;
      }
      if(withinRadius === false) {
        return;
      }
      listCount++;

      return (
        <Item
          title={item.title}
          date={item.date}
          start_time={item.start_time}
          key={"list-item:" + item.id}
          order={listCount}
          id={item.id}>
        </Item>
      )
    }.bind(this));

    var numberOfResults = this.props.data.length;
    for (var i = 0; i < mapMarkers.length; i++){
      if (mapMarkers[i] == undefined){
          numberOfResults -= 1;
      }
    };

    var noClasses = (numberOfResults === 0) ?
      <h3 className="center no-classes-message">There are no classes that match this search.</h3>
      : null;

    return (
      <div className="row lowindex">
      {noClasses}
        <div className="col-sm-1"></div>
        <div className="col-sm-6 lowindex">
          <div id="map">
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
        </div>
        <div className="col-sm-4 margins">
          <div className="map-list-style">
            {noClasses}
            {ListItems}
          </div>
        </div>
      </div>
    );
  }
});

export default MapDisplay;
