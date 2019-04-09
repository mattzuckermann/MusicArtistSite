import React, { Component } from 'react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import './nav.css';

class Nav extends Component {
  loggedin = () => {
    localStorage.getItem('jwtToken') !== null;
  };

  render() {
    return <div>{this.loggedin ? <LoggedIn /> : <LoggedOut />}</div>;
  }
}

export default Nav;
