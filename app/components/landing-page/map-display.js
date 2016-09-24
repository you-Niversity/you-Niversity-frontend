'use strict';
import React, {PropTypes, Component} from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

import GoogleMap from 'google-map-react';


var MapDisplay = React.createClass({

  render: function(){

    var mapStyle = {
      width: '100%',
      marginLeft: '17px',
      height: '400px',
      marginBottom: '50px',
      border: '2px solid orange'

    }
    var listStyle = {
      width: "100%",
      height: '400px',
      border: '2px solid orange',
      padding: 0,
      overflowX: 'scroll'
    }
    var margins = {
      margin: '0 -15px 50px -15px'
    }


    var markerCount = 0;
    var listCount = 0;

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
        </div>
        <div className="col-sm-4 lowindex" style={margins}>
          <div style={listStyle}>
            {noClasses}
            {ListItems}
          </div>
        </div>
      </div>
    );
  }

});

var Item = React.createClass({
  render: function(){

    var markerStyle = {
      color: 'black',
      fontSize: '2em',
      fontWeight: '700',
      textAlign: 'right'
    }

    return (
      <div className="map-list-item">
        <Link to={'/courses/'+this.props.id}>
          <div className="row">
            <div className="col-sm-2" style={markerStyle}>{this.props.order}</div>
            <div className="col-sm-10">
              <p className="bold map-item-title">{this.props.title}</p>
              <p className="map-item-date">{this.props.date}</p>
              <p>@ {this.props.start_time}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
})

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
       <div style={style}>{this.props.order}</div>
    );
  }
});

export default MapDisplay;
