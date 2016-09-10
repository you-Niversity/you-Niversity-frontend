import React from 'react';

var NavbarSecondary = React.createClass({

  render: function(){
    return (
      <nav className="row">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header" id="secondary-header">
              <a className="navbar-brand" href="#"><img src="../../images/owl.png" /></a>
              <a id="you-niversity" className="navbar-brand" href="#">
                <h1> <span className="you">yoU</span>niversity</h1>
              </a>
            </div>
          </div>
        </nav>
      </nav>
    );
  }
});

export default NavbarSecondary;
