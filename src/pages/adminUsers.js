import React, { Component } from 'react';
import { Container, Row, Table, FormGroup, Input } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';


class AdminUsers extends Component {
    render(){
        return (
            <Container>
                <Header />
                <Row className="p-3">
                    <h2 className="d-flex justify-content-center my-4 mx-auto">Список пользователей</h2>
                    <span className="d-flex align-items-center pr-5"><FontAwesomeIcon icon={ faPlus } color="green" size='lg' /></span>
                    <Table bordered>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>email</th>
                            <th>Пароль</th>
                            <th>Дата регистрации</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>
                                <FormGroup>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Пользователь</option>
                                        <option>Администратор</option>
                                    </Input>
                                </FormGroup>    
                            </td>
                            <td style={{textAlign: "center"}}><FontAwesomeIcon icon={ faEdit } color="orange" size='lg' className="mr-5"/> <FontAwesomeIcon icon={ faTrash } color="red" size='lg' /></td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        )
    }
}

export default AdminUsers;