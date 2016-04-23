import React from 'react';

import LogoContainer from '../containers/LogoContainer';
import SideBarNavigation from './SideBarNavigation';

const SideBar = () => {
  return (
    <div className="sidebar">
      <LogoContainer />
      <SideBarNavigation />
    </div>
  );
};

export default SideBar;
