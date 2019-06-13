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
import { Select, Table } from "antd";
import "antd/dist/antd.css";
import "./admin.css";

import { connect } from "react-redux";
import { getMedSystems } from "../actions/MedSystemsActions";
import {
  getMedQuestions,
  addMedQuestions,
  saveMedQuestions,
  deleteMedQuestions
} from "../actions/MedQuestionsActions";

class AdminMedQuestions extends Component {
  constructor() {
    super();

    this.state = {
      addMedQuestionModal: false,
      name: "",
      relatedSystem: "",
      selectedItems: [],
      currentId: null,
      editing: false,
    };
    this.openAddMedQuestionModal = this.openAddMedQuestionModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddMedQuestionModalSubmit = this.handleAddMedQuestionModalSubmit.bind(
      this
    );
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.props.onGetMedQuestions();
    this.props.onGetMedSystems();
  }

  openAddMedQuestionModal = e => {
    e.preventDefault();
    this.setState({
      addMedQuestionModal: true,
      name: "",
      relatedSystem: " "
    });
  };

  closeModal = () => {
    this.setState({
      addMedQuestionModal: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.relatedSystem]: e.target.value
    });
  };

  handleSelectChange = selectedItems => {
    console.log(selectedItems);
    this.setState({ selectedItems });
  };

  handleAddMedQuestionModalSubmit = async e => {
    console.log(e);
    e.preventDefault();
    const dataToSend = {
      name: this.state.name,
      relatedSystem: this.state.selectedItems
    };
    console.log(dataToSend);
    await this.props.onAddMedQuestions(dataToSend).then(success => {
      if (success) {
        console.log("success");
        this.props.onGetMedQuestions();
        this.closeModal();
      }
    });
  };

  changeMedQuestion(e) {
    this.setState({
      newMedQuestion: {
        name: e.target.value,
        relatedSystem: this.state.newMedQuestion.name
      }
    });
  }

  saveMedQuestions() {
    this.props.dispatch(
      saveMedQuestions({
        id: this.state.currentId,
        name: this.state.newMedQuestion
      })
    );
    this.setState({ editing: false, newMedQuestion: { name: "" } });
  }

  handleSaveMedSystems(e) {
    console.log(e);
    this.setState(this.props.medQuestions, { id: e.id, name: e.name });
  }

  handleDeleteMedQuestions = async e => {
    console.log(this.props);
    await this.props.onDeleteMedQuestions(e.id);
    this.props.onGetMedQuestions();
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
        title: "Название медицинского вопроса",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Соответствующие системы",
        dataIndex: "relatedSystem",
        key: "relatedSystem",
        render: system_strs => {
          if (Array.isArray(system_strs)) {
            return system_strs.join(", ");
          }}
        
        // system_ids => {
        //   system_ids.forEach(id => {
        //   this.props.medSystems[this.props.medSystems.findIndex(s => s.id === id)].name.join(", ")})
        // }
      },
      {
        title: "Действия",
        key: "action",
        width: "10%",
        render: (text, id) => (
          // <Fragment>
            // {/* <FontAwesomeIcon
            //   icon={faEdit}
            //   style={{ cursor: "pointer" }}
            //   color="orange"
            //   size="lg"
            //   className="mr-3"
            //   onClick={() => this.handleSaveMedQuestions()}
            // /> */}
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer" }}
              color="red"
              size="lg"
              onClick={() => this.handleDeleteMedQuestions(id)}
            />
          // </Fragment>
        )
      }
    ];
    const { selectedItems } = this.state;
    const filteredOptions = this.props.medSystems.filter(
      o => !selectedItems.includes(o)
    );
    console.log(filteredOptions);

    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end p-3">
          <div className="title">
            <h2>Список медицинских вопросов</h2>
            <span className="add">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ cursor: "pointer" }}
                color="green"
                size="lg"
                onClick={this.openAddMedQuestionModal}
              />
            </span>
          </div>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={this.props.medQuestions}
          />
        </Row>
        <Modal isOpen={this.state.addMedQuestionModal}>
          <ModalHeader>Создание медицинского вопроса</ModalHeader>
          <Form onSubmit={this.handleAddMedQuestionModalSubmit}>
            <ModalBody>
              <FormGroup>
                <Input
                  type="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Введите название медицинского вопроса"
                />
              </FormGroup>
              <Select
                mode="multiple"
                placeholder="Выберите соответствующую(ие) систему(ы)"
                value={selectedItems}
                onChange={this.handleSelectChange}
                style={{ width: "100%" }}
              >
                {filteredOptions.map(item => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
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
  medSystems: state.medSystems.medSystems,
  medQuestions: state.medQuestions.medQuestions
});

const mapDispatchToProps = dispatch => ({
  onGetMedSystems: () => dispatch(getMedSystems()),
  onGetMedQuestions: () => dispatch(getMedQuestions()),
  onAddMedQuestions: id => dispatch(addMedQuestions(id)),
  onSaveMedQuestions: () => dispatch(saveMedQuestions()),
  onDeleteMedQuestions: id => dispatch(deleteMedQuestions(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminMedQuestions);
