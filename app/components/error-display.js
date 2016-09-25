'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var ErrorDisplay = React.createClass({
  render: function(){

    return (
      <div id="error-page" className="center">
        <h1 className="orange">Just who do we think we are,<br/> keeping you from youNiversity course information?</h1>
        <img src="../../images/angryowl.jpg" />
        <h1>Sorry about that. Something happened while we were fetching information from our server...</h1>
      </div>
    )
  }
});

export default ErrorDisplay;
