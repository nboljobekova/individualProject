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
                <NavLink className="mx-3 text-center" style={{fontSize: '1em' }} href="/admin_users">Пользователи/Администраторы</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-3 text-center" style={{fontSize: '1em', borderRight: '1px solid grey', borderLeft: '1px solid grey' }} href="/admin_med_systems">Медицинские системы</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-3 text-center" style={{fontSize: '1em'}} href="/admin_med_questions">Медицинские вопросы</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-3 text-center" style={{fontSize: '1em', borderRight: '1px solid grey', borderLeft: '1px solid grey' }} href="/admin_ps_scales">Психологическая шкала</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mx-3 text-center" style={{fontSize: '1em'}} href="/admin_ps_questions">Психологические вопросы</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}


export default Header;