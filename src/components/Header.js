import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';
import { NavLink } from "react-router-dom";
import './Header.css'




class Header extends Component {

  render() {
    return (
      <div>
        <Navbar expand="md" className="nav navbar-dark p-0">
            <Nav navbar>
              <NavItem className="navitem">
                <NavLink className="navlink" to="/admin_users">Пользователи/Администраторы</NavLink>
              </NavItem>
              <NavItem className="navitem bordered">
                <NavLink className="navlink" to="/med_systems">Медицинские системы</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink className="navlink" to="/med_questions">Медицинские вопросы</NavLink>
              </NavItem>
              <NavItem className="navitem bordered">
                <NavLink className="navlink" to="/ps_scales">Психологическая шкала</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink className="navlink" to="/ps_questions">Психологические вопросы</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}


export default Header;