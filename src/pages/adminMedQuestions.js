import React, { Component } from 'react';
import { Container, Row, Table } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import './admin.css'

const data = [
    'Система переваривания и усвоения пищи', 'Желудочно-кишечный тракт', 'Сердечно-сосудистая система', 'Нервная система',
    'Иммунная система', 'Дыхательная система', 'Мочевыводящая система', 'Эндокринная система',  
    'Опорно-двигательная система', 'Кожа'     
];


class AdminMedQuestions extends Component {
    state = {
        selectedItems: [],
    };
    
    handleChange = selectedItems => {
        this.setState({ selectedItems });
    };

    render(){
        const { selectedItems } = this.state;
        const filteredOptions = data.filter(o => !selectedItems.includes(o));
        return (
            <Container className="pt-3">
                <Header />
                <Row className="d-flex justify-content-end">
                <h2 className="d-flex justify-content-center my-4 mx-auto">Список медицинских вопросов</h2>
                <span className="d-flex align-items-center pr-5"><FontAwesomeIcon icon={ faPlus } color="green" size='lg' /></span>
                    <Table bordered>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th style={{width: '55%'}}>Название вопроса</th>
                            <th style={{width: '35%'}}>Соответствующая система</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>...</td>
                            <td>
                                <Select
                                    mode="multiple"
                                    placeholder="Выберите систему"
                                    value={selectedItems}
                                    onChange={this.handleChange}
                                    className="multipe-select"
                                    style={{ width: '100%', outline: 'none'}}
                                >
                                    {filteredOptions.map(item => (
                                    <Select.Option key={item} value={item}>
                                        {item}
                                    </Select.Option>
                                    ))}
                                </Select>
                            </td>
                            <td style={{textAlign: "center"}}><FontAwesomeIcon icon={ faEdit } color="orange" size='lg' className="mr-3"/> <FontAwesomeIcon icon={ faTrash } color="red" size='lg' /></td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        )
    }
}

export default AdminMedQuestions;