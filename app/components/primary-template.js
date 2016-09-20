'use strict';

import React from 'react';
import Navbar from './navbar.js';
import NavbarLoggedIn from './navbar-logged-in.js';
import LogoutModal from 'boron/OutlineModal';
import Footer from './footer.js';


var modalStyles = {
  btn: {
    padding: '1em 2em',
    width: '25%',
    margin: '1em 0 2em 37.5%',
    outline: 'none',
    fontSize: 16,
    fontWeight: '600',
    background: 'orange',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '3px'
  },
  container: {
    padding: '2em',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    paddingTop: '2em',
    fontSize: '1.5em',
    color: 'orange',
    textAlign: 'center',
    fontWeight: 400
  }
};


var PrimaryTemplate = React.createClass({

  showModal: function(){
    console.log('entering show modal function');
    console.log(this.refs.modal);
    this.refs.modal.show();
  },

  hideModal: function(){
    this.refs.modal.hide();
    browserHistory.push('/');
  },

  render: function(){
    console.log("Current sessionStorage:");
    console.log(sessionStorage);

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


export default PrimaryTemplate;
