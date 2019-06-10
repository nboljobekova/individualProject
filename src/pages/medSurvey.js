import React, { Component } from 'react';
import { Container, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { List, Icon } from 'antd';

import { connect } from "react-redux"
import { getMedSystems } from "../actions/MedSystemsActions"
import { getMedQuestions } from "../actions/MedQuestionsActions"


    const listData = [];


class MedSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
         
      componentDidMount(){
        this.props.onGetMedQuestions()
        this.props.onGetMedSystems()
        }

    render(){
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
        },
        pageSize: 10,
        }}
        dataSource={medQuestions}

        return (
            <Container className="mt-3">
                <Row className="welcome_main-block mt-5 mx-auto">
                    <h2 className="mt-5 mb-5">Пожалуйста, выберите отметьте вопрос галочкой, если ответ положительный</h2>

                </Row>                
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    medSystems: state.medSystems.medSystems,
    medQuestions: state.medQuestions.medQuestions,
});

const mapDispatchToProps = dispatch => ({
    onGetMedSystems: () => dispatch(getMedSystems()),
    onGetMedQuestions: () => dispatch(getMedQuestions()),
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(MedSurvey)