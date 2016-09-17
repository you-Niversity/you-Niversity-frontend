'use strict';
import React from 'react';
import FontAwesome from 'react-fontawesome';

var ListIcon = React.createClass({
  render: function () {
    return (
      <FontAwesome
        className='super-crazy-colors'
        name='list-ul'
        size='lg'
        style={{ marginRight: '5px', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    );
  }
});

export default ListIcon;
