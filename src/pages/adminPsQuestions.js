import React, { Component, Fragment } from "react";
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
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Table, Select } from "antd";
import "antd/dist/antd.css";
import "./admin.css";

import { connect } from "react-redux";
import { getPsScales } from "../actions/PsScalesActions";
import {
  getPsQuestions,
  addPsQuestions,
  savePsQuestions,
  deletePsQuestions
} from "../actions/PsQuestionsActions";

class AdminPsQuestions extends Component {
  constructor() {
    super();

    this.state = {
      addPsQuestionModal: false,
      name: "",
      relatedScale: "",
      selectedItems: [],
      currentId: null,
      editing: false,
      newPsQuestion: {
        name: "",
        relatedScale: ""
      },
      tableConfig: {
        bordered: true,
        loading: true
      }
    };
    this.openAddPsQuestionModal = this.openAddPsQuestionModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddPsQuestionModalSubmit = this.handleAddPsQuestionModalSubmit.bind(
      this
    );
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.props.onGetPsQuestions();
    this.props.onGetPsScales();
  }

  openAddPsQuestionModal = e => {
    e.preventDefault();
    this.setState({
      addPsQuestionModal: true,
      name: "",
      relatedScales: " "
    });
  };

  closeModal = () => {
    this.setState({
      addPsQuestionModal: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.relatedScales]: e.target.value
    });
  };

  handleSelectChange = selectedItems => {
    console.log(selectedItems);
    this.setState({ selectedItems });
  };

  handleAddPsQuestionModalSubmit = async e => {
    console.log(e);
    e.preventDefault();
    const dataToSend = {
      name: this.state.name,
      relatedScales: this.state.selectedItems
    };
    console.log(dataToSend);
    await this.props.onAddPsQuestions(dataToSend).then(success => {
      if (success) {
        console.log("success");
        this.props.onGetPsQuestions();
        this.closeModal();
      }
    });
  };

  changePsQuestion(e) {
    this.setState({ newPsQuestion: { name: e.target.value } });
  }

  savePsQuestions() {
    this.props.dispatch(
      savePsQuestions({
        id: this.state.currentId,
        name: this.state.newPsQuestion
      })
    );
    this.setState({ editing: false, newPsQuestion: { name: "" } });
  }

  handleSavePsQuestions(e) {
    console.log(e);
    this.setState(this.props.psQuestions, { id: e.id, name: e.name });
  }

  handleDeletePsQuestions = async e => {
    console.log(this.props);
    await this.props.onDeletePsQuestions(e.id);
    this.props.onGetPsQuestions();
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
        title: "Название психологического вопроса",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Соответствующие шкалы",
        dataIndex: "relatedScales",
        key: "relatedScales",
        render: system_strs => {
            if (Array.isArray(system_strs)) {
              return system_strs.join(", ");
            }
            return "-";
          }
      },
      {
        title: "Действия",
        key: "action",
        width: "10%",
        render: (text, id) => (
          <Fragment>
            <FontAwesomeIcon
              icon={faEdit}
              style={{ cursor: "pointer" }}
              color="orange"
              size="lg"
              className="mr-3"
              onClick={() => this.handleSavePsQuestions()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer" }}
              color="red"
              size="lg"
              onClick={() => this.handleDeletePsQuestions(id)}
            />
          </Fragment>
        )
      }
    ];
    const { selectedItems } = this.state;
    const filteredOptions = this.props.psScales.filter(
      o => !selectedItems.includes(o)
    );
    console.log(filteredOptions);

    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end p-3">
          <div className="title">
            <h2>Список психологических вопросов</h2>
            <span className="add">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ cursor: "pointer" }}
                color="green"
                size="lg"
                onClick={this.openAddPsQuestionModal}
              />
            </span>
          </div>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={this.props.psQuestions}
          />
        </Row>
        <Modal isOpen={this.state.addPsQuestionModal}>
          <ModalHeader>Создание психологического вопроса</ModalHeader>
          <Form onSubmit={this.handleAddPsQuestionModalSubmit}>
            <ModalBody>
              <FormGroup>
                <Input
                  type="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Введите название психологического вопроса"
                />
              </FormGroup>
              <Select
                mode="multiple"
                placeholder="Выберите соответствующую(ие) шкалу(ы)"
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
  psScales: state.psScales.psScales,
  psQuestions: state.psQuestions.psQuestions
});

const mapDispatchToProps = dispatch => ({
  onGetPsScales: () => dispatch(getPsScales()),
  onGetPsQuestions: () => dispatch(getPsQuestions()),
  onAddPsQuestions: (id) => dispatch(addPsQuestions(id)),
  onSavePsQuestions: () => dispatch(savePsQuestions()),
  onDeletePsQuestions: (id) => dispatch(deletePsQuestions(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPsQuestions);
