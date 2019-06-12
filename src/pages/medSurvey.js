import React, { Component } from "react";
import { Container, Row, Progress, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { List, Form, Input } from "antd";
import "./survey.css";

import { connect } from "react-redux";
import { getMedSystems } from "../actions/MedSystemsActions";
import {
  getMedQuestions,
  testMedQuestions
} from "../actions/MedQuestionsActions";

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

class MedSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      counter: {},
      firstName: "",
      lastName: "",
      email: ""
    };
    this.handleGetAnswers = this.handleGetAnswers.bind(this);
    this.handleCalculateSystems = this.handleCalculateSystems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSendAllData = this.handleSendAllData.bind(this);
    
  }

  componentDidMount() {
    this.props.onGetMedQuestions();
    this.props.onGetMedSystems();
  }

  handleGetAnswers = async e => {
    // e.preventDefault();
    console.log(e)
    let results = [...this.state.results];
    if (results.includes(e.id)) {
      results.splice(results.findIndex(id => e.id === id), 1);
    } else {
      results.push(e.id, e.relatedSystem);
    }
    this.setState({ results });

    this.handleCalculateSystems()
  };

  handleCalculateSystems= async e => {
    // e.preventDefault();
    let results = [...this.state.results];
    let counter = { ...this.state.counter };
    // console.log(results.relatedSystem)
    results.forEach(r => {
        console.log(r.relatedSystem)
    })
    // results.forEach(r => {
    //     r.relatedSystem.forEach(s => {
    //         counter[s] ? counter[s]++ : counter[s]=1
    //     })
    // })
    // this.setState({counter})
  }

  handleSendAllData = async e => {
    e.preventDefault();
    let results = [...this.state.results];
    let counter = { ...this.state.counter };
    const dataToSend = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      answers: results
    };
    console.log(dataToSend);
    await this.props.onTestMedQuestions(dataToSend).then(success => {
      if (success) {
        console.log("success");
      }
    });

    console.log(results);
  };

  handleChange = e => {
      console.log(e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.state);
    return (
      <Container className="mt-3">
        <Row className="welcome_main-block mt-5 mx-auto">
          <Progress multi className="mb-5">
            <Progress animated bar value="20" />
            <Progress animated bar color="success" value="20" />
            <Progress animated bar color="warning" value="20" />
            <Progress animated bar color="danger" value="20" />
            <Progress animated bar color="info" value="20" />
          </Progress>

          <h2 className="mb-5">
            Пожалуйста, отметьте галочкой, если ответ положительный
          </h2>
          <List
            itemLayout="horizontal"
            dataSource={this.props.medQuestions}
            pagination="true"
            size="large"
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.name} />
                <FontAwesomeIcon
                  icon={
                    this.state.results.includes(item.id)
                      ? faCheckCircle
                      : faCircle
                  }
                  style={{ cursor: "pointer" }}
                  color="green"
                  size="lg"
                  className="mr-3"
                  onClick={() => this.handleGetAnswers(item)}
                />
              </List.Item>
            )}
          />
          <Button
            outline
            color="success mb-3 mt-3"
            className="next"
            // onClick={this.openForm}
          >
            Далее
          </Button>

          <div className="form">
            <Form.Item {...formItemLayout} label="Фамилия">
              <Input
                placeholder="Введите вашу фамилию"
                type="text"
                name="lastName"
                className="input"
                value={this.state.lastName}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Имя">
              <Input
                placeholder="Введите ваше имя"
                type="text"
                name="firstName"
                className="input"
                value={this.state.firstName}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="email">
              <Input
                placeholder="Введите ваш email"
                type="text"
                name="email"
                className="input"
                // value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Button
              outline
              color="success mb-3 mt-3"
              block
              onClick={this.handleSendAllData}
            >
              Завершить
            </Button>
          </div>
        </Row>
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
  onTestMedQuestions: data => dispatch(testMedQuestions(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedSurvey);
