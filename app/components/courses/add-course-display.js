'use strict';

import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import request from 'superagent';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import Modal from 'boron/OutlineModal';
import modalStyles from '../styles/modal-styles.js';

var DatePicker = require('react-datepicker');
var moment = require('moment');
moment().format();

var DATABASE_URL ="https://you-niversity-postgresql.herokuapp.com";

var AddCourseDisplay = React.createClass({

  getInitialState: function(){
    return {
      data:[],
      newCourseID: null
    };
  },

  handleCourseSubmit: function(course){
    console.log(moment(course.date._d.toString()).unix()   );
    var unix_timestamp = moment(course.date._d.toString()).unix();
    var user_id = sessionStorage.user_id;
    request
      .post(DATABASE_URL + "/classes")
      .send(course)
      .send({user_id: user_id})
      .send({date: moment(course.date._d).format("MMMM Do YYYY")})
      .send({unix_timestamp: unix_timestamp})
      .send({lat: course.location[0]})
      .send({lng: course.location[1]})
      .send({address: course.location[2] + ' ' + course.location[3]})
      .send({city: course.location[4]})
      .send({state: course.location[5]})
      .end(function(err, res){
        if (err || !res.ok) {
          browserHistory.push('/error');
        } else {
          var newCourseID = res.body[0];
          this.setState({newCourseID: newCourseID})
          this.showModal();
        }
      }.bind(this));
  },

  showModal: function(){
      this.refs.modal.show();
  },
  hideModal: function(){
    this.refs.modal.hide();
    browserHistory.push('/courses/' + this.state.newCourseID);
  },

  render: function(){
    return (
      <div className="row create-course">
        <h2>Create a Course</h2>
          <Modal ref="modal" style={modalStyles.container}>
              <h2 style={modalStyles.title}>Class created!</h2>
              <button style={modalStyles.btn} onClick={this.hideModal}>Close</button>
          </Modal>
        <div className="col-sm-1"></div>
        <div className="col-sm-10 create-course-form form-display">
          <AddCourseForm
            onCourseSubmit={this.handleCourseSubmit}
          />
        </div>
      </div>
    );
  }
});

var AddCourseForm = React.createClass({

  getInitialState: function(){
    return {title: '', description: '', prerequisites: '', price: '', seats: '', image_url: '', date: moment(), location: '', start_time: '', end_time: ''}
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
    console.log(moment(date._d.toString()).unix());
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
    if (!title || !description || !prerequisites || !price || !seats || !date || !location || !start_time || !end_time) {
      return;
    }
    this.props.onCourseSubmit({title: title, description: description, prerequisites: prerequisites, price: price, total_seats: seats, image_url: image_url, date: date, location: location, start_time: start_time, end_time: end_time});
    this.setState({title: '', description: '', prerequisites: '', price: '', seats: '', image_url: '', date: moment(), location: '', start_time: '', end_time: ''});
  },

  render: function() {

    return (
      <form className="addCourseForm" onSubmit={this.handleSubmit}>
      <div className="col-sm-6">
        <input
          type="text"
          placeholder="course title"
          required
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          placeholder="Write a description of the course here."
          rows="10"
          required
          value={this.state.description}
          onChange={this.handleDescriptionChange}>
        </textarea>
        <textarea
          placeholder="What knowledge, skills or materials should a student have before taking this course?"
          rows="10"
          required
          value={this.state.prerequisites}
          onChange={this.handlePrereqChange}>
        </textarea>
        <input
          type="number"
          placeholder="price per seat"
          required
          value={this.state.price}
          onChange={this.handlePriceChange}
        />
      </div>
      <div className="col-sm-6">
        <input
          type="text"
          placeholder="number of seats"
          required
          value={this.state.seats}
          onChange={this.handleSeatsChange}
        />
        <input
          type="text"
          placeholder="image_url"
          required
          value={this.state.image_url}
          onChange={this.handleImageUrlChange}
        />
        <DatePicker
          selected={this.state.date}
          required
          onChange={this.handleDateChange}
        />
        <input
          type="text"
          placeholder="start time, ex: 6:30 a.m."
          required
          value={this.state.start_time}
          onChange={this.handleStartTimeChange}
        />

        <input
          type="text"
          placeholder="end time, ex: 6:30 a.m."
          required
          value={this.state.end_time}
          onChange={this.handleEndTimeChange}
        />

        <Geosuggest
          placeholder="meeting place"
          country="us"
          required
          onSuggestSelect={this.onSuggestSelect}
          value={this.state.location}
        />
        <input type="submit" value="Create Your Course!" className="btn-success form-submit-button"/>
      </div>
      </form>
    )
  }
});

const mapStateToProps = function(store) {
  return store;
}
module.exports = connect(mapStateToProps)(AddCourseDisplay);
