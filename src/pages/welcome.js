import React, { Component } from 'react';
import { Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./welcome.css"

import { connect } from "react-redux"
import { addUsers } from "../actions/UsersActions"

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logModal: false,
            regModal: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            date: '',
            role: ''
        };
    
        this.openLogModal = this.openLogModal.bind(this);
        this.openRegModal = this.openRegModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
      }
    
        openLogModal(e) {
            e.preventDefault();
            this.setState({
                logModal: true,
                regModal: false,
                email: '',
                password: '',
        })};
      
        openRegModal(e) {
            e.preventDefault();
            this.setState({
                logModal: false,
                regModal: true,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
        })};

        closeModal() {
            this.setState({                 
                logModal: false,
                regModal: false 
        })};

        handleChange = (e) => {
            this.setState({ 
                [e.target.name]: e.target.value 
        })};

        handleLoginSubmit(e) {
            e.preventDefault();
            const dataToSend = {              
                "email": this.state.email, 
                "password": this.state.password
            }
            console.log(dataToSend);
            this.props.onAddUsers(dataToSend).then(success=> {
                if(success){
                    this.closeModal()
                }
            })
            // const innerState = {...this.state};
            // delete innerState.logModal;
            // delete innerState.regModal;

            // const formData = new FormData();
            // Object.keys(innerState).forEach(key => {
            //     if (innerState[key]) formData.append(key, innerState[key]);
            // });
            // fetch('/api/form-submit-url', {
            //     method: 'POST',
            //     body: formData,
            // });
            // console.log(this.state);
        }

        handleRegistrationSubmit(e) {
            e.preventDefault();
            const dataToSend = {              
                "firstName": this.state.firstName, 
                "lastName": this.state.lastName,
                "email": this.state.email, 
                "password": this.state.password,
                "date": new Date(),
                "role": "User",
            }
            this.props.onAddUsers(dataToSend).then(success=> {
                if(success){
                    this.closeModal()
                }
            })
        }
              


    render(){
        return (
            <Container className="mt-3">
                <Row className="d-flex justify-content-end">
                    <Button color="success" className="mr-2" onClick={this.openLogModal}>Вход</Button>
                    <Button color="success" onClick={this.openRegModal}>Регистрация</Button>
                </Row>
                <Row className="welcome_main-block mt-5 mx-auto">
                    <h1 className="mt-5">Добро пожаловать!</h1>
                    <h2 className="mt-5 mb-5">Пожалуйста, выберите тип опроса</h2>
                    <Button outline color="success mb-3" block>Медицинский опрос</Button>
                    <Button outline color="warning" block>Психологический опрос</Button>
                </Row>
                <Modal
                    isOpen={this.state.logModal}
                >
                    <ModalHeader>Вход</ModalHeader>
                    <Form onSubmit={this.handleLoginSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Пароль</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Пароль"
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Вход</Button>{' '}
                            <Button color="secondary" onClick={this.closeModal}>Отмена</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Modal 
                        isOpen={this.state.regModal}
                >
                    <ModalHeader>Регистрация</ModalHeader>
                        <Form onSubmit={this.handleRegistrationSubmit}>
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
                            <Button color="primary" type="submit">Регистрация</Button>{' '}
                            <Button color="secondary" onClick={this.closeModal}>Отмена</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Container>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    onAddUsers: (obj) => dispatch(addUsers(obj)),
})
  
  
export default connect(null, mapDispatchToProps)(Welcome)  