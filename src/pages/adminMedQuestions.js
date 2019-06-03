import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
// import makeAnimated from 'react-select/animated';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import { connect } from "react-redux"
import { getMedSystems, addMedSystem, saveMedSystem, deleteMedSystem } from "../actions/MedSystemsActions"
import { getMedQuestions, addMedQuestions, saveMedQuestions, deleteMedQuestions } from "../actions/MedQuestionsActions"


class AdminMedQuestions extends Component {
  componentDidMount(){
      this.props.onGetMedQuestions()
      this.props.onGetMedSystems()
  }

  handleSaveMedSystems(e){
    console.log(e)
    this.setState( this.props.medQuestions, { id: e.id, name:e.name })
  }

  handleDeleteMedQuestions(e){
    console.log(this.props)
    this.props.onDeleteMedQuestions(e.id)
  }

  render(){
    const columns = [
      {
        title: '№',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Название вопроса',
        dataIndex: 'name',
        key: 'name',
      },
      {
          title: 'Соответствующие системы',
          dataIndex: 'relatedSystem',
          key: 'relatedSystem',
        },
      {
        title: 'Действия',
        key: 'action',
        render: (text, record) => 
        <Fragment>
          <FontAwesomeIcon icon={ faEdit } style={{ cursor: "pointer" }} color="orange" size='lg' className="mr-5" onClick={()=>this.handleSaveMedSystems()} />
          <FontAwesomeIcon icon={ faTrash } style={{ cursor: "pointer" }} color="red" size='lg' onClick={()=>this.handleDeleteMedQuestions(record)} />
        </Fragment>
      }
    ];
    // const filteredOptions = medSystems.name.filter(o => !selectedItems.includes(o));
    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end p-3">
          <h2 className="d-flex justify-content-center my-4 mx-auto">Список медицинских вопросов</h2>
          <span className="d-flex align-items-center pr-5"><FontAwesomeIcon icon={ faPlus } color="green" size='lg' /></span>
          <Table rowKey={record => record.id} columns={columns} dataSource={this.props.medQuestions} />
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
    onAddMedQuestions: () => dispatch(addMedQuestions()),
    onSaveMedQuestions: () => dispatch(saveMedQuestions()),
    onDeleteMedQuestions: () => dispatch(deleteMedQuestions()),
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminMedQuestions)