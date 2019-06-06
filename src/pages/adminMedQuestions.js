import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./admin.css"

import { connect } from "react-redux"
// import { getMedSystems, addMedSystem, saveMedSystem, deleteMedSystem } from "../actions/MedSystemsActions"
import { getMedQuestions, addMedQuestions, saveMedQuestions, deleteMedQuestions } from "../actions/MedQuestionsActions"


class AdminMedQuestions extends Component {

  constructor() {
    super();

    this.state = {
      currentId: null,
      editing: false,
      newMedQuestion: {
        name: "",
        relatedSystems: "",
      },
      tableConfig: {
        bordered: true,
        loading: true,
      }
    };
  }

  componentDidMount(){
      this.props.onGetMedQuestions()
      // this.props.onGetMedSystems()
  }

  changeMedQuestion(e) {
    this.setState({newMedQuestion:{name:e.target.value, relatedSystems: this.state.newMedQuestion.age}})
  }

  saveMedQuestions(){
    this.props.dispatch(saveMedQuestions({id: this.state.currentId, name: this.state.newMedQuestion}))
    this.setState({ editing: false, newMedQuestion: { name: "" } })
  }

  handleSaveMedSystems(e){
    console.log(e)
    this.setState( this.props.medQuestions, { id: e.id, name:e.name })
  }

  handleDeleteMedQuestions = async (e) => {
    console.log(this.props)
    await this.props.onDeleteMedQuestions(e.id)
    this.props.onGetMedQuestions()
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
        width: '10%',
        render: (text, id) => 
        <Fragment>
          <FontAwesomeIcon icon={ faEdit } style={{ cursor: "pointer" }} color="orange" size='lg' className="mr-3" onClick={()=>this.handleSaveMedQuestions()} />
          <FontAwesomeIcon icon={ faTrash } style={{ cursor: "pointer" }} color="red" size='lg' onClick={()=>this.handleDeleteMedQuestions(id)} />
        </Fragment>
      }
    ];
    // const filteredOptions = medSystems.name.filter(o => !selectedItems.includes(o));
    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end p-3">
          <div className="title">
            <h2>Список медицинских вопросов</h2>
            <span className="add"><FontAwesomeIcon icon={ faPlus } color="green" size='lg' /></span>
          </div>
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
    // onGetMedSystems: () => dispatch(getMedSystems()),
    onGetMedQuestions: () => dispatch(getMedQuestions()),
    onAddMedQuestions: () => dispatch(addMedQuestions()),
    onSaveMedQuestions: () => dispatch(saveMedQuestions()),
    onDeleteMedQuestions: (id) => dispatch(deleteMedQuestions(id)),
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminMedQuestions)