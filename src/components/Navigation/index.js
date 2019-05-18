import * as React from 'react';
import './Navigation.css';

import { Redirect, NavLink } from 'react-router-dom';

const logo = require('./logo.svg');

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }

  render() {
    return this.state.logout ? <Redirect to="/" /> : (
      <div className="navbar">
        <nav>
          <div className="nav-wrapper grey lighten-5">
            <NavLink to="/" className="brand-logo left">
              <div><img src={logo} width="56px" height="56px" alt=""/></div>
            </NavLink>
            <ul className="right">
              <li><NavLink to="/profile" exact={true}>
                <i className="material-icons">person_outline</i>
              </NavLink>
              </li>
              <li><NavLink to="/list" exact={true}>
                <i className="material-icons">list</i>
              </NavLink>
              </li>
              <li><NavLink to="/search" exact={true}>
                <i className="material-icons">search</i>
              </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
