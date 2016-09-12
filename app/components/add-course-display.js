'use strict';

import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';
var DatePicker = require('react-datepicker');
var moment = require('moment');
moment().format();


var AddCourseDisplay = React.createClass({

  getInitialState: function(){
    return {
      data:[]
    };
  },

  handleCourseSubmit: function(course){
    console.log(course.title);
    console.log(moment(course.date._d).format("MMMM Do YYYY"));
    request
      .post("http://localhost:8080/classes")
      .send(course)
      .send({date: moment(course.date._d).format("MMMM Do YYYY")})
      .end(function(err, res){
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          console.log("successfully created class");
        }
      });
  },

  render: function(){
    return (
      <div>
        <h1>add course form goes here.</h1>
        <AddCourseForm
          onCourseSubmit={this.handleCourseSubmit}
        />
      </div>
    );
  }

});

var AddCourseForm = React.createClass({
  getInitialState: function(){
    return {title: '', description: '', prerequisites: '', price: '', seats: '', image_url: '', date: moment()}
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
    console.log(moment(date).format("MMMM Do YYYY"));
    this.setState({date: date});
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
    if (!title || !description ) {
      return;
    }
    this.props.onCourseSubmit({title: title, description: description, prerequisites: prerequisites, price: price, total_seats: seats, image_url: image_url, date: date});
    console.log('now clear the form');
    this.setState({title: '', description: '', prerequisites: '', price: '', seats: '', image_url: '', date: moment()});
  },
  render: function() {
    return (
      <form className="addCourseForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="course title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          placeholder="Write a description of the course here."
          rows="10"
          value={this.state.description}
          onChange={this.handleDescriptionChange}>
        </textarea>
        <textarea
          placeholder="What knowledge, skills or materials should a student have before taking this course?"
          rows="10"
          value={this.state.prerequisites}
          onChange={this.handlePrereqChange}>
        </textarea>
        <input
          type="number"
          placeholder="price per seat"
          value={this.state.price}
          onChange={this.handlePriceChange}
        />
        <input
          type="text"
          placeholder="number of seats"
          value={this.state.seats}
          onChange={this.handleSeatsChange}
        />

        <input
          type="text"
          id="image_url"
          placeholder="image_url"
          value={this.state.image_url}
          onChange={this.handleImageUrlChange}
        />

        <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
        />

        {/*<input
          type="text"
          placeholder="course duration"
          value={this.state.duration}
          onChange={this.handleDurationChange}
        />
        */
        /*
        <input
          type="text"
          placeholder="Where does this course meet?"
          value={this.state.address}
          onChange={this.handleAddressChange}
        />
        */}

        <input type="submit" value="Add Course"/>
      </form>
    )
  }
});

export default AddCourseDisplay;
