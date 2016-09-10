'use strict';
import React from 'react';
import nocache from 'superagent-no-cache';
import request from 'superagent';

{/*var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    )
  },
  render: function() {
    return (
      <div id="landing-search-div" className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <div id="search-bar" className="row">
            <div className="col-sm-6">
              <form>
                <input
                  type="text"
                  placeholder="Search courses"
                  value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <div className="col-sm-6"><h4>within 25 miles of Loveland, CO</h4></div>
          </div>
        </div>
      </div>
    )
  }
});*/}


var CourseDisplay = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      filterText: ''
    };
  },

  handleUserInput: function(filterText){
    this.setState({
      filterText: filterText
    });
  },

  getCoursesFromAPI: function() {
    request
      .get("http://localhost:8080/classes")
      .end(function(err, res){
        if (err){
          console.log('There was an error grabbing the classes from the API.');
        } else {
          console.log(res.body);
          this.setState({data: res.body});
        }
      }.bind(this))
  },

  handleCourseSubmit: function(course){
    console.log("post request goes here");
  },

  componentDidMount: function() {
    this.getCoursesFromAPI();
  },

  render: function() {
    return (
      <div className="CourseDisplay">
        {/*<SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />*/}
        {/*<AddCourseForm onCourseSubmit={this.handleCourseSubmit}/>*/}
        <CourseList
          data={this.state.data}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
});

var CourseList = React.createClass({
  render: function() {

    var courseNodes = this.props.data.map(function(course) {
      if ((this.props.filterText !== '' && course.title.indexOf(this.props.filterText) === -1)){
        console.log('if');
        return;
      };
      return (
        <Course
          title={course.title}
          image_url={course.image_url}
          description={course.description}
          prerequisites={course.prerequisites}
          key={course.id}>
        </Course>
      )
    }.bind(this));

    return (
      <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8" id="class-display">
            <div className="row"><h3>Upcoming Classes</h3></div>

            <div id="course-block" className="row">
              {courseNodes}
            </div>
          </div>
      </div>

    );
  }
});

var Course = React.createClass({

  render: function() {
    var courseStyle = {
      backgroundImage: 'url(' + this.props.image_url + ')',
    }
    return (
      <a href=""><div style={courseStyle} className="single-course">
        <div className="single-course-text">
          <p>September 23 | 8:30 a.m.</p>
          <hr/>
          <h4 className="courseTitle">{this.props.title}</h4>
        </div>
      </div></a>
    );
  }
});

var AddCourseForm = React.createClass({
  getInitialState: function(){
    return {title: '', description: '', prerequisites: '', price: '', seats: '', image_url: ''}
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
  handleSubmit: function(event){
    event.preventDefault();
    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var prerequisites = this.state.prerequisites.trim();
    var price = this.state.price.trim();
    var seats = this.state.seats.trim();
    var image_url = this.state.image_url.trim();
    if (!title || !description || !prerequisites || !price || !seats) {
      return;
    }
    this.props.onCourseSubmit({title: title, description: description, prerequisites: prerequisites, price: price, total_seats: seats, image_url: image_url});
    console.log('now clear the form');
    this.setState({title: '', description: '', prerequisites: '', price: '', seats: '', image_url: ''});
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
        <input
          type="text"
          placeholder="course description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <input
          type="text"
          placeholder="course prerequsites"
          value={this.state.prerequisites}
          onChange={this.handlePrereqChange}
        />
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

        /*
        <input
          type="text"
          placeholder="course duration"
          value={this.state.duration}
          onChange={this.handleDurationChange}
        />
        */
        /*
        <input
          type="text"
          placeholder="course address"
          value={this.state.address}
          onChange={this.handleAddressChange}
        />
        */
        /*
        <input
          type="text"
          placeholder="course city"
          value={this.state.city}
          onChange={this.handleCityChange}
        />
        */
        /*
        <input
          type="text"
          placeholder="course state"
          value={this.state.state}
          onChange={this.handleStateChange}
        />
        */
        /*
        <input
          type="number"
          placeholder="course zipcode"
          value={this.state.zipcode}
          onChange={this.handleZipcodeChange}
        />
        */
        <input type="submit" value="Post"/>
      </form>
    )
  }
});

export default CourseDisplay;
