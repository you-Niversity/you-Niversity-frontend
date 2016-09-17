import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var NavbarLoggedIn = React.createClass({

  handleLogoutSubmit: function(){
    sessionStorage.clear();
    browserHistory.push('/');
  },


  render: function(){

    var first_name = sessionStorage.getItem('first_name');
    var id = sessionStorage.getItem('user_id');
    var image_url = sessionStorage.getItem('image_url');

    var userPic = {
      width: "65px",
      height: "65px",
      marginTop: "-25px",
      borderRadius: "100%",
      backgroundImage: 'url(' + image_url + ')',
      backgroundSize: "cover",
      backgroundPosition: "center"
    }

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
              <li><Link to="/addcourse">+ add course</Link></li>

                <li className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  welcome, {first_name}
                  <span className="caret"></span>
                </li>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li><Link to={'/users/'+ id}>Profile</Link></li>
                  <li onClick={this.handleLogoutSubmit}><Link to="#">Logout</Link></li>
                </ul>
              <li><div style={userPic}></div></li>
            </ul>
          </div>
        </nav>
      </nav>
    );
  }
});

export default NavbarLoggedIn;
