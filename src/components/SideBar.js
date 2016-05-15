import React from 'react';

import utils from '../utils';
import LogoContainer from '../containers/LogoContainer';
import SideBarNavigation from './SideBarNavigation';

const SideBar = () => {
  return (
    <div className="sidebar">
      <LogoContainer />
      <SideBarNavigation />
      <div className="sidebar-bottom">
        IN DEVELOPMENT. ANYTHING CAN BREAK. {utils.version()}
      </div>
    </div>
  );
};

export default SideBar;
