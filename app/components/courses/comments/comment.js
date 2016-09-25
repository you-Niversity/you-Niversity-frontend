'use strict';

import React from 'react';

var Comment = React.createClass({

  render: function(){

    var commenterImageStyle = {
      backgroundImage: 'url(' + this.props.profile_pic + ')'
    }

    return (
      <div className="row">
        <div className="col-sm-3 commenter-image" style={commenterImageStyle}></div>
        <div className="col-sm-9">
          <p className="reviewer-name">{this.props.name}</p>
          <p>{this.props.date}</p>
          <p className="review-message">{this.props.comment}</p>
          <hr />
        </div>
      </div>
    )
  }
});

export default Comment;
