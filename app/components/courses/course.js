'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';


var Course = React.createClass({

  render: function() {
    
    var courseStyle = {
      backgroundImage: 'url(' + this.props.image_url + ')',
      color: 'white'
    }

    return (
      <Link to={'/courses/'+this.props.id}><div style={courseStyle} className="single-course">
        <div className="single-course-text">
          <p>{this.props.date}</p>
          <hr/>
          <h4 className="course-title">{this.props.title}</h4>
        </div>
      </div></Link>
    );
  }
});

export default Course;
