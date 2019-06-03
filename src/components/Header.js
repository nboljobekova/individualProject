import React, { Component } from 'react';
import { Navbar, Nav } from 'reactstrap';
import { NavLink } from "react-router-dom";
import './Header.css'




class Header extends Component {

  render() {
    return (
      <div>
        <Navbar expand="md" className="nav navbar-dark p-0">
            <Nav navbar>
              <NavLink className="navlink" to="/admin_users">
              Пользователи/Администраторы
              </NavLink>
              <NavLink className="navlink bordered" to="/med_systems">
                Медицинские системы
              </NavLink>
              <NavLink className="navlink" to="/med_questions">
                Медицинские вопросы
              </NavLink>
              <NavLink className="navlink bordered" to="/ps_scales">
                Психологическая шкала
              </NavLink>
              <NavLink className="navlink" to="/ps_questions">
                Психологические вопросы
              </NavLink>
            </Nav>
        </Navbar>
      </div>
    );
  }
}


export default Header;