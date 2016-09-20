'use strict';

import React from 'react';
import NavbarSecondary from './navbar-secondary.js';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Footer from './footer.js';


var SecondaryTemplate = React.createClass({

  render: function(){
    console.log("Current userState:");
    console.log(this.props.userState);

    return (
      <div>
        <div className="container-fluid">
          <div id="secondary-div">
            <div id="secondary-div-row" className="row">
              <div className="col-sm-2"></div>
              <div id="center-content" className="col-sm-8">
                {<NavbarSecondary />}
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }

});

export default SecondaryTemplate;
