'use strict';
import React from 'react';
import FontAwesome from 'react-fontawesome';

var MessageAlertIcon = React.createClass({
  render: function () {
    return (
      <FontAwesome
        name='bell'
        size='lg'
        style={{ fontSize: '1em',  cursor: 'pointer', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    );
  }
});

export default MessageAlertIcon;
