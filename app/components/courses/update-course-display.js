'use strict';

import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import Geosuggest from 'react-geosuggest';
import Modal from 'boron/OutlineModal';
import modalStyles from '../styles/modal-styles.js';
import { connect } from 'react-redux';

var DatePicker = require('react-datepicker');
var moment = require('moment');
moment().format();

var DATABASE_URL ="https://you-niversity-postgresql.herokuapp.com";

var UpdateCourseDisplay = React.createClass({

  getInitialState: function(){
    return {
      courseData:[]
    };
  },

  getCourseDataFromAPI: function(id){
    request
      .get(DATABASE_URL + "/classes/" + id)
      .end(function(err, res){
        if(err){
          browserHistory.push('/error');
        } else {
          this.setState({courseData: res.body[0]});
        }
      }.bind(this))
  },

  componentDidMount: function(){
    var id = this.props.params.id;
    this.getCourseDataFromAPI(id);
  },

  handleCourseUpdate: function(course){
    var user_id = sessionStorage.user_id;
    request
      .put(DATABASE_URL + "/classes/:id")
      .send(course)
      .send({date: moment(course.date._d).format("MMMM Do YYYY")})
      .send({lat: course.location[0]})
      .send({lng: course.location[1]})
      .send({address: course.location[2] + ' ' + course.location[3]})
      .send({city: course.location[4]})
      .send({state: course.location[5]})
      .end(function(err, res){
        if (err || !res.ok) {
          browserHistory.push('/error');
        } else {
          browserHistory.push('/users/' + user_id);
        }
      });
  },

  handleCourseDelete: function(){
    var id = this.state.courseData.id;
    request
      .del(DATABASE_URL + '/classes/' + id)
      .end(function(err, res){
        if (err || !res.ok) {
          browserHistory.push('/error');
        } else {
          this.showModal()
        }
      }.bind(this));
  },

  showModal: function(){
      this.refs.modal.show();
  },

  hideModal: function(){
      this.refs.modal.hide();
      browserHistory.push('/users/' + sessionStorage.user_id);
  },

  render: function(){
    return (
      <div className="row create-course">

        <Modal ref="modal" style={modalStyles.container}>
            <h2 style={modalStyles.title}>Class successfully deleted!</h2>
            <button style={modalStyles.btn} onClick={this.hideModal}>Close</button>
        </Modal>

        <h2>Update this Course</h2>
        <div className="col-sm-1"></div>
        <div className="col-sm-10 create-course-form form-display">
          <UpdateCourseForm
            onCourseSubmit={this.handleCourseUpdate}
            course={this.state.courseData}
          />
          <input type="submit" onClick={browserHistory.goBack} value="Nevermind" className="btn-warning form-submit-button fifty" />
          <input type="submit" onClick={this.handleCourseDelete} value="Delete Course" className="btn-danger form-submit-button fifty fifty-right" />
        </div>
      </div>
    );
  }
});

var UpdateCourseForm = React.createClass({

  getInitialState: function(){
    return {
      title: this.props.course.title,
      description: this.props.course.description,
      prerequisites: this.props.course.prerequisites,
      price: this.props.course.price,
      seats: this.props.course.seats,
      image_url: this.props.course.image_url,
      date: moment(moment.unix(this.props.course.unix_timestamp)._d).format("MMMM Do YYYY"),
      location: this.props.course.location,
      start_time: this.props.course.start_time,
      end_time: this.props.course.end_time
    }
  },

  handleTitleChange: function(event){
    this.setState({title: event.target.value})
  },
  handleDescriptionChange: function(event){
    this.setState({description: event.target.value})
  },
  handlePrereqChange: function(event){
    this.setState({prerequisites: event.target.value})
  },
  handlePriceChange: function(event){
    this.setState({price: event.target.value})
  },
  handleSeatsChange: function(event){
    this.setState({seats: event.target.value})
  },
  handleImageUrlChange: function(event){
    this.setState({image_url: event.target.value})
  },
  handleDateChange: function(date) {
    this.setState({date: date});
  },
  onSuggestSelect: function(suggest) {
    var data = suggest.gmaps.address_components;
    this.setState({location: [suggest.location.lat, suggest.location.lng, data[0].long_name, data[1].long_name, data[2].long_name, data[5].long_name]})
  },
  handleStartTimeChange: function(event){
    this.setState({start_time: event.target.value})
  },
  handleEndTimeChange: function(event){
    this.setState({end_time: event.target.value})
  },
  handleSubmit: function(event){
    event.preventDefault();

    console.log(this.props.course.description);
    console.log(this.state.description);

    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var prerequisites = this.state.prerequisites.trim();
    var price = this.state.price.trim();
    var seats = this.state.seats.trim();
    var image_url = this.state.image_url.trim();
    var date = this.state.date;
    var location = this.state.location;
    var start_time = this.state.start_time;
    var end_time = this.state.end_time;
    if (!title) {
      return;
    }
    this.props.onCourseSubmit({title: title, description: description, prerequisites: prerequisites, price: price, total_seats: seats, image_url: image_url, date: date, location: location, start_time: start_time, end_time: end_time});
    this.setState({title: '', description: '', prerequisites: '', price: '', seats: '', image_url: '', date: moment(), location: '', start_time: '', end_time: ''});
  },

  render: function() {
    var today = moment();

    return (
      <form className="addCourseForm" onSubmit={this.handleSubmit}>
      <div className="col-sm-6">
        <input
          type="text"
          placeholder={this.props.course.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          placeholder={this.props.course.description}
          rows="10"
          onChange={this.handleDescriptionChange}>
        </textarea>
        <textarea
          placeholder={this.props.course.prerequisites}
          rows="10"
          onChange={this.handlePrereqChange}>
        </textarea>
        <input
          type="number"
          placeholder={this.props.course.price}
          onChange={this.handlePriceChange}
        />
      </div>
      <div className="col-sm-6">
        <input
          type="text"
          placeholder={this.props.course.total_seats}
          onChange={this.handleSeatsChange}
        />
        <input
          type="text"
          placeholder={this.props.course.image_url}
          onChange={this.handleImageUrlChange}
        />
        <DatePicker
          selected={today}
          onChange={this.handleDateChange}
        />
        <input
          type="text"
          placeholder={this.props.course.start_time}
          onChange={this.handleStartTimeChange}
        />
        <input
          type="text"
          placeholder={this.props.course.end_time}
          onChange={this.handleEndTimeChange}
        />

        <Geosuggest
          placeholder={'click to change location'}
          country="us"
          onSuggestSelect={this.onSuggestSelect}
        />
        <input type="submit" value="Update Course" className="btn-success form-submit-button"/>
      </div>
      </form>
    )
  }
});

const mapStateToProps = function(store) {
  return store;
}

module.exports = connect(mapStateToProps)(UpdateCourseDisplay);
