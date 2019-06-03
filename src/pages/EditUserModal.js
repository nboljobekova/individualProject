import React, {Component} from 'react'



class EditUserModal extends Component {


    render (){

        return (

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

                        )
                    }
                }
