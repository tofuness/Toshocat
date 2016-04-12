import React, { Component } from 'react';

import LogoContainer from '../containers/LogoContainer';
import SideBarNavigation from './SideBarNavigation';

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <LogoContainer />
        <SideBarNavigation />
      </div>
    );
  }
}

export default SideBar;
