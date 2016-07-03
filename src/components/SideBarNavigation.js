import React from 'react';
import { Link } from 'react-router';

const SideBarNavigation = () => {
  return (
    <div className="sidebar-navigation">
      <div className="sidebar-navigation-label">
        Main
      </div>
      <div className="sidebar-navigation-link">
        <Link to="/animelist" activeClassName="active">
          <span className="icon-three-bars"></span>Anime list
        </Link>
      </div>
      <div className="sidebar-navigation-link">
        <Link to="/mangalist" activeClassName="active">
          <span className="icon-three-bars"></span>Manga list
        </Link>
      </div>
      <div className="sidebar-navigation-spacer"></div>
      <div className="sidebar-navigation-label">
        Browse
      </div>
      <div className="sidebar-navigation-link">
        <Link to="/calendar" activeClassName="active">
          <span className="icon-calendar"></span>Calendar
        </Link>
      </div>
      <div className="sidebar-navigation-link hide">
        <Link to="/chart" activeClassName="active">
          <span className="icon-map"></span>Season Charts
        </Link>
      </div>
      <div className="sidebar-navigation-link">
        <Link to="/search" activeClassName="active">
          <span className="icon-search"></span>Search
        </Link>
      </div>
      <div className="sidebar-navigation-spacer"></div>
      <div className="sidebar-navigation-label">
        System
      </div>
      <div className="sidebar-navigation-link">
        <Link to="/settings" activeClassName="active">
          <span className="icon-gear"></span>Settings
        </Link>
      </div>
    </div>
  );
};

export default SideBarNavigation;
