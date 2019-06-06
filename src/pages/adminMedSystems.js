import React, { Component, Fragment } from 'react';
import { Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./admin.css"

import { connect } from "react-redux"
import { getMedSystems, addMedSystem, saveMedSystem, deleteMedSystem } from "../actions/MedSystemsActions"


class AdminMedSystems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMedSystemModal: false,
      name: '',

      currentId: null,
      editing: false,
      newMedSystem: {
        name: "",
      },
      tableConfig: {
        bordered: true,
        loading: true,
      }
    };
    this.openAddMedSystemModal = this.openAddMedSystemModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalRedirect = this.modalRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddMedSystemModalSubmit = this.handleAddMedSystemModalSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onGetMedSystems()
    console.log(this.props.medSystems)
  }

  // redirect = () => {
  //   console.log(this.props)
  //   this.props.history.push('/add_systems'); 

  // }

  openAddMedSystemModal = (e) => {
    e.preventDefault();
    this.setState({
      addMedSystemModal: true,
      name: '',
    })
  };

  closeModal = () => {
    this.setState({
      addMedSystemModal: false,
    })
  };

  modalRedirect = () => {
    this.props.history.push('/med_systems');
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleAddMedSystemModalSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      "name": this.state.name,
    }
    console.log(dataToSend);
    await this.props.onAddMedSystems(dataToSend).then(success => {
      if (success) {
        this.closeModal();
        this.props.onGetMedSystems()
      }
    });
  }

    handleDeleteMedSystems = async (e) => {
      console.log(this.props)
      await this.props.onDeleteMedSystems(e.id)
      this.props.onGetMedSystems()
    }


    // handleUpdateMedSystem = async (e) => {
    //   console.log(e)
    //   await this.setState({ currentId: e.id, editing: true, newMedSystem: { name: e.name } })
    //   this.props.onSaveMedSystems(e.name)
    //   this.props.onGetMedSystems()
    // };

    // handleSaveMedSystems = async (e) => {
    //   console.log(e)
    //   this.setState({ id: e.id, medSystems: { name: e.name } })
    // };



    render() {
      const columns = [
        {
          title: '№',
          dataIndex: 'id',
          width: '5%',
          key: 'id',
        },
        {
          title: 'Название системы',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Действия',
          key: 'action',
          width: '10%',
          render: (text, id) =>
            <Fragment>
              <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} color="orange" size='lg' className="mr-3" onClick={() => this.handleUpdateMedSystem(text)} />
              <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} color="red" size='lg' onClick={() => this.handleDeleteMedSystems(id)} />
            </Fragment>
        },
      ]
      return (
        <Container className="mt-3">
          <Header />
          <Row className="d-flex flex-column justify-content-end p-3">
            <div className="title">
              <h2>Список медицинских систем</h2>
              <span className="add"><FontAwesomeIcon icon={faPlus} style={{ cursor: "pointer" }} color="green" size='lg' onClick={this.openAddMedSystemModal} /></span>
            </div>
            <Table dataSource={this.props.medSystems} columns={columns} />
          </Row>
          <Modal
            isOpen={this.state.addMedSystemModal}
          >
            <ModalHeader>Создание медицинского вопроса</ModalHeader>
            <Form onSubmit={this.handleAddMedSystemModalSubmit}>
              <ModalBody>
                <FormGroup>
                  <Label>Название медицинского вопроса</Label>
                  <Input
                    type="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Введите название вопроса"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">Создать</Button>{' '}
                <Button color="secondary" onClick={this.closeModal}>Отмена</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Container>
      )
    }
  }


  const mapStateToProps = state => ({
    medSystems: state.medSystems.medSystems,
  });

  const mapDispatchToProps = dispatch => ({
    onGetMedSystems: () => dispatch(getMedSystems()),
    onAddMedSystems: (name) => dispatch(addMedSystem(name)),
    onSaveMedSystems: (text) => dispatch(saveMedSystem(text)),
    onDeleteMedSystems: (id) => dispatch(deleteMedSystem(id)),
  })


  export default connect(mapStateToProps, mapDispatchToProps)(AdminMedSystems)