'use strict';

import React from 'react';
import Navbar from './navbar.js';

var SecondaryTemplate = React.createClass({

  render: function(){
    return (
      <div className="container-fluid">
        <div id="secondary-div">
          <div id="secondary-div-row" className="row">
            <div className="col-sm-2"></div>
            <div id="center-content" className="col-sm-8">
              {<Navbar />}
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

});


export default SecondaryTemplate;
