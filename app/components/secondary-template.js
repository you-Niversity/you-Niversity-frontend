'use strict';

import React from 'react';
import NavbarSecondary from './navbar-secondary.js';

var SecondaryTemplate = React.createClass({

  render: function(){
    return (
      <div className="container-fluid">
        <div id="secondary-div">
          <div id="landing-div-row" className="row">
            <div className="col-sm-1"></div>
            <div id="center-content" className="col-sm-10">
              <NavbarSecondary />
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

});


export default SecondaryTemplate;
