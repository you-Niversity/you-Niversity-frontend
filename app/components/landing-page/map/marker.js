'use strict';
import React, {PropTypes, Component} from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var Marker = React.createClass({
  propTypes: {
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
      letterSpacing: '-2px',
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
      letterSpacing: '-2px',
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

export default Marker;
