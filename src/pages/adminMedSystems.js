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
  Input
} from "reactstrap";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./admin.css";

import { connect } from "react-redux";
import {
  getMedSystems,
  addMedSystem,
  saveMedSystem,
  deleteMedSystem
} from "../actions/MedSystemsActions";

class AdminMedSystems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMedSystemModal: false,
      editMedSystemModal: false,
      name: ""
    };
  }

  componentDidMount() {
    this.props.onGetMedSystems();
    console.log(this.props.medSystems);
  }

  openAddMedSystemModal = e => {
    e.preventDefault();
    this.setState({
      addMedSystemModal: true,
      editMedSystemModal: false,
      name: ""
    });
  };

  openEditMedSystemModal = e => {
    e.preventDefault();
    this.setState({
      addMedSystemModal: false,
      editMedSystemModal: true,
      name: ""
    });
  };

  closeModal = () => {
    this.setState({
      addMedSystemModal: false,
      editMedSystemModal: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddMedSystemModalSubmit = async e => {
    e.preventDefault();
    const dataToSend = {
      name: this.state.name
    };
    console.log(dataToSend);
    await this.props.onAddMedSystems(dataToSend).then(success => {
      if (success) {
        console.log("success");
        this.props.onGetMedSystems();
        this.closeModal();
      }
    });
  };

  handleEditMedSystemModalSubmit = async e => {
    e.preventDefault();
    const dataToSend = {
      name: this.state.name
    };
    console.log(dataToSend);
    await this.props.onSaveMedSystems(dataToSend).then(success => {
      if (success) {
        console.log("success");
        this.props.onGetMedSystems();
        this.closeModal();
      }
    });
  };

  handleDeleteMedSystems = async e => {
    console.log(this.props);
    await this.props.onDeleteMedSystems(e.id);
    this.props.onGetMedSystems();
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
        title: "Название медицинской системы",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Действия",
        key: "action",
        width: "10%",
        render: (text, id) => (
          <FontAwesomeIcon
            icon={faTrash}
            style={{ cursor: "pointer" }}
            color="red"
            size="lg"
            onClick={() => this.handleDeleteMedSystems(id)}
          />
        )
      }
    ];
    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end p-3">
          <div className="title">
            <h2>Список медицинских систем</h2>
            <span className="add">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ cursor: "pointer" }}
                color="green"
                size="lg"
                onClick={this.openAddMedSystemModal}
              />
            </span>
          </div>
          <Table dataSource={this.props.medSystems} columns={columns} />
        </Row>
        <Modal isOpen={this.state.addMedSystemModal}>
          <ModalHeader>Создание медицинской системы</ModalHeader>
          <Form onSubmit={this.handleAddMedSystemModalSubmit}>
            <ModalBody>
              <FormGroup>
                <Input
                  type="name"
                  name="name"
                  value={this.props.name}
                  onChange={this.handleChange}
                  placeholder="Введите название медицинской системы"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Создать
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
  medSystems: state.medSystems.medSystems
});

const mapDispatchToProps = dispatch => ({
  onGetMedSystems: () => dispatch(getMedSystems()),
  onAddMedSystems: name => dispatch(addMedSystem(name)),
  onSaveMedSystems: name => dispatch(saveMedSystem(name)),
  onDeleteMedSystems: id => dispatch(deleteMedSystem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminMedSystems);
