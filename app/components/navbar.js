import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var Navbar = React.createClass({

  render: function(){
    return (
      <nav className="row">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/"><img src="../../images/owl.png" /></Link>
              <Link id="you-niversity" className="navbar-brand" to="/">
                <h1> <span className="you">yoU</span>niversity</h1>
              </Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login">login</Link></li>
              <li><Link to="/signup">signup</Link></li>
            </ul>
          </div>
        </nav>
      </nav>
    );
  }
});

export default Navbar;
