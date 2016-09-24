'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import TrashIcon from '../icons/trash-icon.js';


var Thread = React.createClass({

  onThreadClick: function(){
    this.props.onThreadClick(this.props.id);
  },
  onTrashClick: function(){
    this.props.onTrashClick(this.props.id);
  },

  render: function(){

    var profilePic = {
      backgroundImage: 'url(' + this.props.sender_profile_pic + ')',
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "100%",
      width: "50px",
      height: "50px"
    }

    return (
      <div onClick={this.onThreadClick} className="row single-thread">
        <div className="col-sm-2" style={profilePic}></div>
        <div className="col-sm-8">
          <h2>{this.props.sender_first_name} {this.props.sender_last_name}</h2>
          <h3>{this.props.title}</h3>
        </div>
        <div className="col-sm-2" onClick={this.onTrashClick}>
          <TrashIcon />
        </div>
      </div>

    )
  }
})


export default Thread;
