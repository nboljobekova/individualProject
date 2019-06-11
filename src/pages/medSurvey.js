import React, { Component } from "react";
import { Container, Row, Progress } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { List } from "antd";

import { connect } from "react-redux";
import { getMedSystems } from "../actions/MedSystemsActions";
import {
  getMedQuestions,
  testMedQuestions
} from "../actions/MedQuestionsActions";

class MedSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      counter: {}
    };
    this.getAnswers = this.getAnswers.bind(this);
    this.handleReplyQuestion = this.handleReplyQuestion.bind(this);
  }

  componentDidMount() {
    this.props.onGetMedQuestions();
    this.props.onGetMedSystems();
  }

  getAnswers(){
    this.state.results.forEach(id => {
        const q = this.props.medQuestions[this.props.medQuestions.findIndex(q => q.id === id)];
        console.log(q)
        this.state.results.push(q)
    })
  }

  handleReplyQuestion = async e => {
    console.log(e);
    e.preventDefault();
    const dataToSend = {
      answers: this.state.results
    };
    console.log(dataToSend);
    await this.props.onTestMedQuestions(dataToSend).then(success => {
      if (success) {
        console.log("success");
      }
    });
  };

  render() {
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
                    icon={faCircle}
                    style={{ cursor: "pointer" }}
                    color="green"
                    size="lg"
                    className="mr-3"
                    onClick={this.getAnswers}
                    />                    
                    <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ cursor: "pointer" }}
                    color="green"
                    size="lg"
                    className="mr-3"
                    onClick={this.getAnswers}
                    />
                </List.Item>
            )}
         />
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
  onTestMedQuestions: () => dispatch(testMedQuestions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedSurvey);
