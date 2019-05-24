import React, { Component } from 'react';
// import { Container, Row, Button } from 'reactstrap';
import { Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./welcome.css"
// import ModalLogin from "./modalLogin";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logModal: false,
            regModal: false,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        };
    
        this.openLogModal = this.openLogModal.bind(this);
        this.openRegModal = this.openRegModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                firstname: '',
                lastname: '',
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

        handleSubmit(e) {
            e.preventDefault();
            const innerState = {...this.state};
            delete innerState.logModal;
            delete innerState.regModal;
            const formData = new FormData();
            Object.keys(innerState).forEach(key => {
                if (innerState[key]) formData.append(key, innerState[key]);
            });
            // fetch('/api/form-submit-url', {
            //     method: 'POST',
            //     body: formData,
            // });
            console.log(this.state);
        }
              


    render(){
        return (
            <Container className="pt-3">
                <Row className="d-flex justify-content-end">
                    <Button color="success" className="mr-2" onClick={this.openLogModal}>Login</Button>
                    <Button color="success" onClick={this.openRegModal}>Register</Button>
                </Row>
                <Row className="welcome_main-block mt-5 mx-auto">
                    <h1 className="mt-5">Welcome!</h1>
                    <h2 className="mt-5 mb-5">Please choose survey</h2>
                    <Button outline color="success mb-3" block>Medical survey</Button>
                    <Button outline color="warning" block>Psychological survey</Button>
                </Row>
                <Modal
                    isOpen={this.state.logModal}
                >
                    <ModalHeader>Login</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label>Email address</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Password"
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Login</Button>{' '}
                            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Modal 
                        isOpen={this.state.regModal}
                >
                    <ModalHeader>Register</ModalHeader>
                        <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label>First name</Label>
                                <Input
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    value={this.state.firstname}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Last name</Label>
                                <Input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={this.state.lastname}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email address</Label>
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
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Register</Button>{' '}
                            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Container>
        )
    }
}

export default Welcome;