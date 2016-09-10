import React from 'react';
import NavbarSecondary from './navbar-secondary.js';

var SecondaryTemplate = React.createClass({

  render: function(){
    return (
      <div>
        <h1>This is the secondary template.</h1>
        <NavbarSecondary />
        {this.props.children}
      </div>
    );
  }

});


export default SecondaryTemplate;
