import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Header from "../components/Header"
import { Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import DatePrettify from "./datePrettify"
import { connect } from "react-redux"
import { getUsers, addUsers, saveUsers, deleteUsers } from "../actions/UsersActions"

class AdminUsers extends Component {

  componentDidMount() {
    this.props.onGetUsers()
    console.log(this.props.users)
  }

  handleDeleteUsers = async (e) => {
    console.log(this.props)
    await this.props.onDeleteUsers(e.id)
    this.props.onGetUsers()
  }

  render() {
    const columns = [
      {
        title: '№',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Пароль',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: 'Дата регистрации',
        dataIndex: 'date',
        key: 'date',
        render: (date, id) => { 
          console.log(date)
          return <DatePrettify>{date}</DatePrettify>
        }
      },
      {
        title: 'Роль',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Действия',
        key: 'action',
        render: (text, id) =>
          <Fragment>
            <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} color="orange" size='lg' className="mr-5" onClick={() => this.handleSaveUsers()} />
            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} color="red" size='lg' onClick={() => this.handleDeleteUsers(id)} />
          </Fragment>
      }
    ];

    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end p-3">
          <h2 className="d-flex justify-content-center my-4 mx-auto">Список пользователей</h2>
          <span className="d-flex align-items-center pr-5"><FontAwesomeIcon icon={faPlus} color="green" size='lg' /></span>
          <Table rowKey={record => record.id} columns={columns} dataSource={this.props.users} />
          {/* <EditUserModal /> */}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  onGetUsers: () => dispatch(getUsers()),
  onAddUsers: () => dispatch(addUsers()),
  onSaveUsers: () => dispatch(saveUsers()),
  onDeleteUsers: (id) => dispatch(deleteUsers(id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)           