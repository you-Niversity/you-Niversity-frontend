import React from 'react';

var NavbarSecondary = React.createClass({

  render: function(){
    return (
      <nav className="row">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><img src="../../images/owl.png" /></a>
              <a id="you-niversity" className="navbar-brand" href="#">
                <h1> <span className="you">yoU</span>niversity</h1>
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">login</a></li>
              <li><a href="#">signup</a></li>
            </ul>
          </div>
        </nav>
      </nav>
    );
  }
});

export default NavbarSecondary;
