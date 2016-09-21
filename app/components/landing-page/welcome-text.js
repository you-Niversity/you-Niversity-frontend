'use strict';
import React from 'react';

var WelcomeText = React.createClass({

  render: function(){
    return (
      <div id="landing-message" className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <h3>whether we teach or be taught</h3>
          <h2 className="animated fadeIn">We never stop teaching and learning from each other</h2>
        </div>
      </div>
    );
  }
});

export default WelcomeText;
