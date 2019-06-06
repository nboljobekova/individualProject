import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./admin.css"

import { connect } from "react-redux"
import { getPsQuestions, addPsQuestions, savePsQuestions, deletePsQuestions } from "../actions/PsQuestionsActions"


class AdminPsQuestions extends Component {
    constructor() {
        super();
    
        this.state = {
          currentId: null,
          editing: false,
          newPsQuestion: {
            name: "",
            relatedScales: "",
          },
          tableConfig: {
            bordered: true,
            loading: true,
          }
        };
      }
    
    componentDidMount(){
    this.props.onGetPsQuestions()
    // this.props.onGetPsScales()
    }
  
    changePsQuestion(e) {
      this.setState({newPsQuestion:{name:e.target.value }})
    }
  
    savePsQuestions(){
      this.props.dispatch(savePsQuestions({id: this.state.currentId, name: this.state.newPsQuestion}))
      this.setState({ editing: false, newPsQuestion: { name: "" } })
    }
  
    handleSavePsQuestions(e){
      console.log(e)
      this.setState( this.props.psQuestions, { id: e.id, name:e.name })
    }
  
    handleDeletePsQuestions = async (e) => {
      console.log(this.props)
      await this.props.onDeletePsQuestions(e.id)
      this.props.onGetPsQuestions()
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
            title: 'Название психологического вопроса',
            dataIndex: 'name',
            key: 'name',
          },
          {
              title: 'Соответствующие шкалы',
              dataIndex: 'relatedScales',
              key: 'relatedScales',
            },
          {
            title: 'Действия',
            key: 'action',
            width: '10%',
            render: (text, id) => 
            <Fragment>
              <FontAwesomeIcon icon={ faEdit } style={{ cursor: "pointer" }} color="orange" size='lg' className="mr-3" onClick={()=>this.handleSavePsQuestions()} />
              <FontAwesomeIcon icon={ faTrash } style={{ cursor: "pointer" }} color="red" size='lg' onClick={()=>this.handleDeletePsQuestions(id)} />
            </Fragment>
          }
        ];

        return (
          <Container className="mt-3">
            <Header />
            <Row className="d-flex flex-column justify-content-end p-3">
              <div className="title">
                <h2>Список психологических вопросов</h2>
                <span className="add"><FontAwesomeIcon icon={ faPlus } color="green" size='lg' /></span>
              </div>
              <Table rowKey={record => record.id} columns={columns} dataSource={this.props.psQuestions} />
            </Row>
          </Container>
        )
      }
    }
    
    
    const mapStateToProps = state => ({
        psScales: state.psScales.psScales,
        psQuestions: state.psQuestions.psQuestions,
    });
    
    const mapDispatchToProps = dispatch => ({
        onGetPsQuestions: () => dispatch(getPsQuestions()),
        onAddPsQuestions: () => dispatch(addPsQuestions()),
        onSavePsQuestions: () => dispatch(savePsQuestions()),
        onDeletePsQuestions: (id) => dispatch(deletePsQuestions(id)),
    })
      
      
export default connect(mapStateToProps, mapDispatchToProps)(AdminPsQuestions)