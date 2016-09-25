'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var Footer = React.createClass({
  render: function(){

    return (
      <div>
        <footer>
            <Link to="#"><p>About <span className="orange">yoU</span>niversity</p></Link>
            <Link to="https://github.com/you-Niversity"><img src="../../images/github.png" /></Link>
            <Link to="https://www.linkedin.com/in/kristenfostermarks"><img src="../../images/linkedin.png" /></Link>
        </footer>
      </div>
    );
  }
});

export default Footer;
