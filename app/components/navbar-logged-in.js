'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Modal from 'boron/OutlineModal';
import modalStyles from './styles/modal-styles.js';
import { connect } from 'react-redux';
import store from '../store';
import { userLogoutSuccess } from '../actions/user-actions';
import NewMessagesIcon from './icons/new-messages-icon.js';
import MessageAlertIcon from './icons/message-alert.js';


var NavbarLoggedIn = React.createClass({

  componentDidMount: function(){
    this.props.checkForUnreadMessages();
  },

  handleLogoutSubmit: function(e){
    e.preventDefault();
    sessionStorage.removeItem('first_name');
    sessionStorage.removeItem('image_url');
    sessionStorage.removeItem('user_id');
    this.showModal();
  },

  showModal: function(){
    this.refs.modal.show();
  },

  hideModal: function(){
    this.refs.modal.hide();
    this.props.logout();
    browserHistory.push('/');
  },

  render: function(){

    var first_name = sessionStorage.getItem('first_name');
    var id = sessionStorage.getItem('user_id');
    var image_url = sessionStorage.getItem('image_url');

    var userPic = {
      backgroundImage: 'url(' + image_url + ')',
    }

    var unreadMessagesExist = (this.props.unreadMessagesExist) ?
      <MessageAlertIcon />
      : null;

    return (

      <nav className="row">
        <Modal ref="modal" style={modalStyles.container}>
            <p style={modalStyles.title}>Thanks for stopping by...see you soon!</p>
            <button style={modalStyles.btn} onClick={this.hideModal}>Close</button>
        </Modal>
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
              <li><Link to={'/messages/'+ id}><NewMessagesIcon />{unreadMessagesExist}</Link></li>
              <li className="dropdown-toggle pointer" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  welcome, {first_name}
                  <span className="caret"></span>
              </li>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><Link to={'/users/'+ id}>Dashboard</Link></li>
                <li><Link to="#" onClick={this.handleLogoutSubmit}>Logout</Link></li>
                </ul>
              <li><div className="nav-user-img" style={userPic}></div></li>
            </ul>
          </div>
        </nav>
      </nav>
    );
  }
});

const mapStateToProps = function(store) {
  return store;
}

const mapDispatchToProps = function(dispatch){
  return {
    logout: function(user){
      dispatch(userLogoutSuccess());
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavbarLoggedIn);
