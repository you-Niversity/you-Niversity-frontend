'use strict';
import React, {PropTypes, Component} from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var Item = React.createClass({
  render: function(){
    return (
      <div className="map-list-item">
        <Link to={'/courses/'+this.props.id}>
          <div className="row">
            <div className="col-sm-2 list-marker-style">{this.props.order}</div>
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

export default Item;
