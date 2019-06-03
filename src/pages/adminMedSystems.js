import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import { connect } from "react-redux"
import { getMedSystems, addMedSystem, saveMedSystem, deleteMedSystem } from "../actions/MedSystemsActions"


class AdminMedSystems extends Component {
  constructor() {
    super();

    this.state = {
      currentId: null,
      editing: false,
      newMedSystem: {
        name: "",
      },
      tableConfig: {
        bordered: true,
        loading: true,
      }
    };
  }

  componentDidMount() {
    this.props.onGetMedSystems()
    console.log(this.props.medSystems)
  }

  handleUpdateMedSystem = async (e) => {
    console.log(e)
    await this.setState({ currentId: e.id, editing: true, newMedSystem:{name:e.name} })
    this.props.onSaveMedSystems(e.name)
    this.props.onGetMedSystems()
  }

  handleSaveMedSystems(e){
    console.log(e)
    this.setState({ id: e.id, medSystems:{name:e.name} })
  }

  handleDeleteMedSystems = async (e) => {
    console.log(this.props)
    await this.props.onDeleteMedSystems(e.id)
    this.props.onGetMedSystems()
  }

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name of the system',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, id) => 
        <Fragment> 
          <FontAwesomeIcon icon={ faEdit } style={{ cursor: "pointer" }} color="orange" size='lg' className="mr-5" onClick={()=>this.handleUpdateMedSystem(text)}/> 
          <FontAwesomeIcon icon={ faTrash } style={{ cursor: "pointer" }} color="red" size='lg' onClick={()=>this.handleDeleteMedSystems(id)}/> 
        </Fragment>
      },
    ]
    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end">
        <h2 className="d-flex justify-content-center my-4 mx-auto">Список медицинских систем</h2>
          <div>
          <div className="d-flex align-items-center pr-5"><FontAwesomeIcon icon={ faPlus } color="green" size='lg' /></div>
          <Table dataSource={this.props.medSystems} columns={columns} />
          </div>
        </Row>
      </Container>
    )
  }
}


const mapStateToProps = state => ({
  medSystems: state.medSystems.medSystems,
});

const mapDispatchToProps = dispatch => ({
  onGetMedSystems: () => dispatch(getMedSystems()),
  onAddMedSystems: () => dispatch(addMedSystem()),
  onSaveMedSystems: (text) => dispatch(saveMedSystem(text)),
  onDeleteMedSystems: (id) => dispatch(deleteMedSystem(id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminMedSystems)