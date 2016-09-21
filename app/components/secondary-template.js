'use strict';

import React from 'react';
import NavbarSecondary from './navbar-secondary.js';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Footer from './footer.js';
import { connect } from 'react-redux';
import store from '../store';
import { userLoginSuccess } from '../actions/user-actions';


var SecondaryTemplate = React.createClass({

  componentDidMount: function(){
    if((!this.props.userState.profile) && (sessionStorage.user_id)) {
      this.props.login({profile: {first_name: sessionStorage.first_name, user_id: sessionStorage.user_id}});
    }
  },

  render: function(){

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


const mapStateToProps = function(store) {
  return store;
}
const mapDispatchToProps = function(dispatch){
  return {
    login: function(user){
      dispatch(userLoginSuccess(user));
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SecondaryTemplate);
