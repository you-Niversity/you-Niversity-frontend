'use strict';

import React from 'react';
import Navbar from './navbar.js';
import NavbarLoggedIn from './navbar-logged-in.js';

var SecondaryTemplate = React.createClass({

  render: function(){
    console.log("Current sessionStorage:");
    console.log(sessionStorage);

    var loggedInNav = (sessionStorage.first_name) ?
      <NavbarLoggedIn />
      : null;

    var nav = (!sessionStorage.first_name) ?
      <Navbar />
      : null;

    return (
      <div className="container-fluid">
        <div id="secondary-div">
          <div id="secondary-div-row" className="row">
            <div className="col-sm-2"></div>
            <div id="center-content" className="col-sm-8">



              {loggedInNav}
              {nav}




              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

});


export default SecondaryTemplate;
