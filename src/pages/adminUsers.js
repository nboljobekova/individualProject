import React, { Component } from "react";
import {
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Header from "../components/Header";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePrettify from "./datePrettify";

import { connect } from "react-redux";
import {
  getUsers,
  addUsers,
  saveUsers,
  deleteUsers
} from "../actions/UsersActions";
import "./admin.css";

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addUserModal: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      date: "",
      role: ""
    };
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddUserSubmit = this.handleAddUserSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onGetUsers();
    console.log(this.props.users);
  }

  openAddUserModal(e) {
    e.preventDefault();
    this.setState({
      addUserModal: true,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  }

  closeModal() {
    this.setState({
      addUserModal: false
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddUserSubmit(e) {
    e.preventDefault();
    const dataToSend = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      date: new Date(),
      role: "Admin"
    };
    this.props.onAddUsers(dataToSend).then(success => {
      if (success) {
        this.props.onGetUsers();
        this.closeModal();
      }
    });
  }

  handleDeleteUsers = async e => {
    console.log(this.props);
    await this.props.onDeleteUsers(e.id);
    this.props.onGetUsers();
  };

  render() {
    const columns = [
      {
        title: "№",
        dataIndex: "id",
        width: "5%",
        key: "id"
      },
      {
        title: "Имя",
        dataIndex: "firstName",
        key: "firstName"
      },
      {
        title: "Фамилия",
        dataIndex: "lastName",
        key: "lastName"
      },
      {
        title: "email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Пароль",
        dataIndex: "password",
        key: "password"
      },
      {
        title: "Дата регистрации",
        dataIndex: "date",
        key: "date",
        render: (date, id) => {
          // console.log(date);
          return <DatePrettify>{date}</DatePrettify>;
        }
      },
      {
        title: "Роль",
        dataIndex: "role",
        key: "role"
      },
      {
        title: "Действия",
        key: "action",
        width: "10%",
        render: (text, id) => (
          <FontAwesomeIcon
            icon={faTrash}
            className="icon"
            style={{ cursor: "pointer", textAlign: "center", margin: "0 auto" }}
            color="red"
            size="lg"
            onClick={() => this.handleDeleteUsers(id)}
          />
        )
      }
    ];

    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end p-3">
          <div className="title">
            <h2>Список пользователей</h2>
            <span className="add">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ cursor: "pointer" }}
                color="green"
                size="lg"
                onClick={this.openAddUserModal}
              />
            </span>
          </div>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={this.props.users}
          />
        </Row>
        <Modal isOpen={this.state.addUserModal}>
          <ModalHeader>Добавление пользователя</ModalHeader>
          <Form onSubmit={this.handleAddUserSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>Имя</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Имя"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Фамилия</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Фамилия"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Пароль</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Добавить
              </Button>{" "}
              <Button color="secondary" onClick={this.closeModal}>
                Отмена
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = dispatch => ({
  onGetUsers: () => dispatch(getUsers()),
  onAddUsers: id => dispatch(addUsers(id)),
  onSaveUsers: () => dispatch(saveUsers()),
  onDeleteUsers: id => dispatch(deleteUsers(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsers);
