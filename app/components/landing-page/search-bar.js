'use strict';
import React from 'react';
import Geosuggest from 'react-geosuggest';

var SearchBar = React.createClass({

  getInitialState: function(){
    return {
      radius: this.props.radius,
      lat: this.props.lat,
      lng: this.props.lng
    };
  },

  handleChange: function() {
    this.props.handleUserInput(
      this.refs.filterTextInput.value
    )
  },

  handleRadiusChange: function() {
    this.props.handleRadiusInput(
      this.refs.radiusInput.value
    )
    this.setState({radius: this.refs.radiusInput.value});
  },

  onSuggestSelect: function(suggest){
    console.log(suggest.location);
    this.props.handleLocationInput(suggest);
    this.setState({lat:suggest.location.lat, lng:suggest.location.lng});
  },

  render: function() {

    var location = this.props.city + ', ' + this.props.state;

    return (
        <div id="landing-search-div" className="row animated fadeIn">
          <div className="col-sm-12">
            <div id="search-bar" className="row" data-arbitrary="stuff">
              <div className="col-sm-3">
                <form>
                  <input
                    type="text"
                    placeholder=" Search courses"
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange} />
                </form>
              </div>
              <div className="col-sm-4">
                <h4>within
                  <select value={this.state.radius} ref="radiusInput" onChange={this.handleRadiusChange}>
                    <option value='{"radius":0.8335, "zoom":9}'>50</option>
                    <option value='{"radius":0.41675, "zoom":10}'>25</option>
                    <option value='{"radius":0.25005, "zoom":11}'>15</option>
                    <option value='{"radius":0.1667, "zoom":12}'>10</option>
                    <option value='{"radius":0.08335, "zoom":13}'>5</option>
                  </select>
                  miles of
                </h4>
              </div>
              <div className="col-sm-5" id="search-geosuggest">
                <Geosuggest
                  placeholder={location}
                  country="us"
                  onSuggestSelect={this.onSuggestSelect}
                  value={this.state.location}
                />
              </div>
            </div>
          </div>
        </div>
    )
  }
});

export default SearchBar;
