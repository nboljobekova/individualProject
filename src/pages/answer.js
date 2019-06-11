import React, { Component } from "react";
// import { Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { List } from "antd";

import { connect } from "react-redux";
import { getMedSystems } from "../actions/MedSystemsActions";
import {
  getMedQuestions,
  testMedQuestions,
  generateAnswers
} from "../actions/MedQuestionsActions";

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questionId: "",
        answer: false
    };
    // this.handleReplyQuestion = this.handleReplyQuestion.bind(this);
  }

  componentDidMount() {
    this.props.onGetMedQuestions();
    this.props.onGetMedSystems();
  }

//   handleReplyQuestion = async e => {
//     console.log(e);
//     e.preventDefault();
//     const dataToSend = {
//       answer: 1
//     };
//     console.log(dataToSend);
//     await this.props.onTestMedQuestions(dataToSend).then(success => {
//       if (success) {
//         console.log("success");
//       }
//     });
//   };

getQuestionById = (id) => {
    return (
        
    )
}


  render() {
    return (
      <List.Item>
        <List.Item.Meta title={item.name} />
        {/* <FontAwesomeIcon
          icon={faCheckCircle}
          style={{ cursor: "pointer" }}
          color="green"
          size="lg"
          className="mr-3"
          onClick={() => this.handleReplyQuestion()}
        /> */}
        <FontAwesomeIcon
          icon={faCircle}
          style={{ cursor: "pointer" }}
          color="green"
          size="lg"
          className="mr-3"
          onClick={() => this.setState({ answer: true })}
        />
      </List.Item>
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
  onTestMedQuestions: () => dispatch(testMedQuestions()),
  onGenerateAnswers: () => dispatch(generateAnswers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
