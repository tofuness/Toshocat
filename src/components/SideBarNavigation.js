import React, { Component } from 'react';
import { Link } from 'react-router';

class SideBarNavigation extends Component {
  render() {
    return (
      <div className="sidebar-navigation">
        <div className="sidebar-navigation-label">
          Main
        </div>
        <div className="sidebar-navigation-link">
          <Link to="/animelist" activeClassName="active">Anime list</Link>
        </div>
        <div className="sidebar-navigation-link">
          <Link to="/mangalist" activeClassName="active">Manga list</Link>
        </div>
        <div className="sidebar-navigation-spacer"></div>
        <div className="sidebar-navigation-label">
          Browse
        </div>
        <div className="sidebar-navigation-link">
          <Link to="/calendar" activeClassName="active">Calendar</Link>
        </div>
        <div className="sidebar-navigation-link">
          <Link to="/rss" activeClassName="active">RSS Feed</Link>
        </div>
        <div className="sidebar-navigation-link">
          <Link to="/search" activeClassName="active">Search</Link>
        </div>
        <div className="sidebar-navigation-spacer"></div>
        <div className="sidebar-navigation-label">
          System
        </div>
        <div className="sidebar-navigation-link">
          <Link to="/settings" activeClassName="active">Settings</Link>
        </div>
      </div>
    );
  }
}

export default SideBarNavigation;
