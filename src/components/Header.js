import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';




class Header extends Component {

  render() {
    return (
      <div>
        <Navbar expand="md" className="d-flex flex-row justify-content-center navbar-dark" style={{backgroundColor: '#697882'}}>
            <Nav navbar>
              <NavItem>
                <NavLink className="mx-3" style={{fontSize: '1.3em'}} href="/admin_users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-3" style={{fontSize: '1.3em'}} href="/admin_systems">Systems</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-3" style={{fontSize: '1.3em'}} href="/admin_questions">Questions</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}


export default Header;