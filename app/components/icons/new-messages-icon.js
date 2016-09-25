'use strict';
import React from 'react';
import FontAwesome from 'react-fontawesome';

var NewMessagesIcon = React.createClass({
  render: function () {
    return (
      <FontAwesome
        name='comments'
        size='lg'
        style={{ fontSize: '1.6em',  cursor: 'pointer', color: 'orange', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    );
  }
});

export default NewMessagesIcon;
