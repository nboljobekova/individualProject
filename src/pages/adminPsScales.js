import React, { Component, Fragment } from 'react';
import { Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./admin.css";

import { connect } from 'react-redux';
import { getPsScales, addPsScales, savePsScales, deletePsScales } from "../actions/PsScalesActions";



class AdminPsScales extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          addPsScalesModal: false,
          name: '',
    
          currentId: null,
          editing: false,
          newPsScale: {
            name: "",
          },
          tableConfig: {
            bordered: true,
            loading: true,
          }
        };
        this.openAddPsScalesModal = this.openAddPsScalesModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalRedirect = this.modalRedirect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddPsScalesModalSubmit = this.handleAddPsScalesModalSubmit.bind(this);
      }
    
      componentDidMount() {
        this.props.onGetPsScales()
        console.log(this.props.psScales)
      }
    
      openAddPsScalesModal = (e) => {
        e.preventDefault();
        this.setState({
          addPsScalesModal: true,
          name: '',
        })
      };
    
      closeModal = () => {
        this.setState({
          addPsScalesModal: false,
        })
      };
    
      modalRedirect = () => {
        this.props.history.push('/ps_scales');
      }
    
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      };
    
      handleAddPsScalesModalSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
          "name": this.state.name,
        }
        console.log(dataToSend);
        await this.props.onAddPsScales(dataToSend).then(success => {
          if (success) {
            this.closeModal();
            this.props.onGetPsScales()
          }
        });
      }
    
        handleDeletePsScales = async (e) => {
          console.log(this.props)
          await this.props.onDeletePsScales(e.id)
          this.props.onGetPsScales()
        }

    render(){

        const columns = [
            {
              title: '№',
              dataIndex: 'id',
              width: '5%',
              key: 'id',
            },
            {
              title: 'Название психологической шкалы',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Действия',
              key: 'action',
              width: '10%',
              render: (text, id) =>
                <Fragment>
                  <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} color="orange" size='lg' className="mr-3" onClick={() => this.handleUpdatePsScales(text)} />
                  <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} color="red" size='lg' onClick={() => this.handleDeletePsScales(id)} />
                </Fragment>
            },
          ]
          return (
            <Container className="mt-3">
              <Header />
              <Row className="d-flex flex-column justify-content-end p-3">
                <div className="title">
                  <h2>Список психологических шкал</h2>
                  <span className="add"><FontAwesomeIcon icon={faPlus} style={{ cursor: "pointer" }} color="green" size='lg' onClick={this.openAddPsScalesModal} /></span>
                </div>
                <Table dataSource={this.props.psScales} columns={columns} />
              </Row>
              <Modal
                isOpen={this.state.addPsScalesModal}
              >
                <ModalHeader>Создание психологической шкалы</ModalHeader>
                <Form onSubmit={this.handleAddPsScalesModalSubmit}>
                  <ModalBody>
                    <FormGroup>
                      <Input
                        type="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Введите название психологической шкалы"
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
psScales: state.psScales.psScales,
});

const mapDispatchToProps = dispatch => ({
onGetPsScales: () => dispatch(getPsScales()),
onAddPsScales: (name) => dispatch(addPsScales(name)),
onSavePsScales: (text) => dispatch(savePsScales(text)),
onDeletePsScales: (id) => dispatch(deletePsScales(id)),
})
    
    
export default connect(mapStateToProps, mapDispatchToProps)(AdminPsScales)