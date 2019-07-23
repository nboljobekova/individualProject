import React, { Component } from "react";
import { Navbar } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";

class Header extends Component {

  render() {
    return (
      <div>
        <NavLink className="to_home" to="/">
          Log out
        </NavLink>
        <Navbar expand="md" className="nav navbar-dark p-0">
          <NavLink className="navlink" to="/admin_users">
            Пользователи/Администраторы
          </NavLink>
          <NavLink className="navlink bordered" to="/med_systems">
            Медицинские системы
          </NavLink>
          <NavLink className="navlink" to="/med_questions">
            Медицинские вопросы
          </NavLink>
        </Navbar>
      </div>
    );
  }
}

export default Header;
