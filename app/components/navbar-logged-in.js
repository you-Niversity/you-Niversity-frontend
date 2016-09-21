import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Modal from 'boron/OutlineModal';
import { connect } from 'react-redux';

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


var NavbarLoggedIn = React.createClass({

  handleLogoutSubmit: function(e){
    e.preventDefault();
    sessionStorage.clear();
    this.showModal();
  },

  showModal: function(){
    this.refs.modal.show();
  },

  hideModal: function(){
    this.refs.modal.hide();
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

        <Modal ref="modal" style={modalStyles.container}>
            <h3 style={modalStyles.title}>Thanks for stopping by...see you soon!</h3>
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

                <li className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  welcome, {first_name}
                  <span className="caret"></span>
                </li>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li><Link to={'/users/'+ id}>Dashboard</Link></li>
                  <li><Link to="#" onClick={this.handleLogoutSubmit}>Logout</Link></li>
                </ul>
              <li><div style={userPic}></div></li>
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
    login: function(user){
      dispatch(userLoginSuccess(user));
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavbarLoggedIn);
