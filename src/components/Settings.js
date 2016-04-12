import React, { Component } from 'react';
import settings from '../utils/settings';

class Settings extends Component {
  render() {
    return (
      <pre
        style={
          {
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            width: '100%',
            padding: '40px'
          }
        }
        className="st"
      >
        {JSON.stringify(settings.all, null, 2)}
      </pre>
    );
  }
}

export default Settings;
