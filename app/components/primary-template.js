'use strict';

import React from 'react';
import request from 'superagent';
import Navbar from './navbar.js';
import NavbarLoggedIn from './navbar-logged-in.js';
import LogoutModal from 'boron/OutlineModal';
import Footer from './footer.js';
import { connect } from 'react-redux';
import store from '../store';
import { userLoginSuccess } from '../actions/user-actions';
import modalStyles from './styles/modal-styles.js';

var DATABASE_URL ="http://localhost:8080";

var PrimaryTemplate = React.createClass({

  componentDidMount: function(){
    console.log(this.props.messageState);
    console.log(this.props);
    if((!this.props.userState.profile) && (sessionStorage.user_id)) {
      this.props.login({profile: {first_name: sessionStorage.first_name, user_id: sessionStorage.user_id}});
    }
  },

  showModal: function(){
    this.refs.modal.show();
  },

  hideModal: function(){
    this.refs.modal.hide();
    browserHistory.push('/');
  },

  render: function(){
    var nav = (sessionStorage.first_name) ?
      <NavbarLoggedIn
        showModal={this.showModal}
      />
      : <Navbar />;

    return (
      <div>
        <div className="container-fluid">
          <div id="secondary-div">
            <div id="secondary-div-row" className="row">
              <div className="col-sm-2"></div>
              <div id="center-content" className="col-sm-8">
                {nav}
                {this.props.children}
                <LogoutModal ref="modal" style={modalStyles.container}>
                    <h2 style={modalStyles.title}>Thanks for stopping by...see you soon!</h2>
                    <button style={modalStyles.btn} onClick={this.hideModal}>Close</button>
                </LogoutModal>
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(PrimaryTemplate);
