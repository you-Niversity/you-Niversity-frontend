'use strict';
import React from 'react';
import CourseDisplay from './course-display.js';

var LandingPage = React.createClass({

  render: function(){
    return (
      <div className="container-fluid">
        <div id="landing-div">
          <div id="landing-div-row" className="row">
            <div className="col-sm-1"></div>
            <div id="center-content" className="col-sm-10">
              <Navbar />
              <WelcomeText />
              <SearchBar />
            </div>
          </div>
        </div>
        <CourseDisplay />
      </div>
    );
  }
});


var Navbar = React.createClass({

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

var WelcomeText = React.createClass({

  render: function(){
    return (
      <div id="landing-message" className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3>whether we teach or be taught</h3>
          <h2>We never stop teaching and learning from each other</h2>
        </div>
      </div>
    );
  }
});

var SearchBar = React.createClass({

  render: function() {
    return (
      <div id="landing-search-div" className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div id="search-bar" className="row" data-arbitrary="stuff">
            <div className="col-sm-6">
              <form>
                <input
                  type="text"
                  placeholder="Search courses" />

                  {/* value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange}*/}

              </form>
            </div>
            <div className="col-sm-6"><h4>within 25 miles of Loveland, CO</h4></div>
          </div>
        </div>
      </div>
    )
  }
});

export default LandingPage;
