'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var StickyFooter = React.createClass({
  render: function(){

    var StickyFooter = {
      position: "absolute",
      bottom: "0",
      left: "0"
    }

    return (
      <div>
        <footer style={StickyFooter}>
            <Link to="/about"><p>About <span className="orange">yoU</span>niversity</p></Link>
            <Link to="https://github.com/you-Niversity"><img src="../../images/github.png" /></Link>
            <Link to="https://www.linkedin.com/in/kristenfostermarks"><img src="../../images/linkedin.png" /></Link>
        </footer>
      </div>
    );
  }
});

export default StickyFooter;
