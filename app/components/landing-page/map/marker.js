'use strict';
import React, {PropTypes, Component} from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var Marker = React.createClass({

  render() {
    var markerStyle = {
      position: 'absolute',
      width: '30px',
      height: '30px',
      backgroundColor: 'orange',
      color: 'black',
      textAlign: 'center',
      fontSize: '1.8em',
      paddingTop: '3px',
      paddingRight: '2px',
      letterSpacing: '-2px',
      fontWeight: '700',
      border: '2px solid black',
      borderRadius: '100%'
    }

    return (
       <div style={markerStyle}>{this.props.order}</div>
    );
  }
});

export default Marker;
