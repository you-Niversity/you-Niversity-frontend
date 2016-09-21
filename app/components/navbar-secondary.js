import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var NavbarSecondary = React.createClass({

  render: function(){
    return (
      <nav className="row">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header" id="secondary-header">
              <Link className="navbar-brand" to="/"><img src="../../images/owl.png" /></Link>
              <Link id="you-niversity" className="navbar-brand" to="/">
                <h1> <span className="you">yoU</span>niversity</h1>
              </Link>
            </div>
          </div>
        </nav>
      </nav>
    );
  }
});

export default NavbarSecondary;
