import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import { connect } from "react-redux"
import { getMedSystems, addMedSystem, saveMedSystem, deleteMedSystem } from "../actions/MedSystemsActions"


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
    render: () => <div> <FontAwesomeIcon icon={ faEdit } color="orange" size='lg' className="mr-5"/> <FontAwesomeIcon icon={ faTrash } color="red" size='lg' /> </div>
  },
];

class AdminMedSystems extends Component {

  componentDidMount(){
    this.props.onGetMedSystems()
  }

  // handleSaveMedSystems(e){
  //   console.log(e)
  //   this.setState({ id: e.id, medSystems:{name:e.name} })
  // }

  // handleDeleteMedSystem(e){
  //   console.log(this.props)
  //   this.props.dispatch(deleteMedSystem(e.id))
  // }


  render() {
    // let medSystems;
    try {
      console.log(this.props.medSystems)
    } catch {

    }

    return (
      <Container className="mt-3">
        <Header />
        <Row className="d-flex flex-column justify-content-end">
        <h2 className="d-flex justify-content-center my-4 mx-auto">Список медицинских систем</h2>
          <div>
          <div className="d-flex align-items-center pr-5"><FontAwesomeIcon icon={ faPlus } color="green" size='lg' /></div>
          <Table dataSource={this.props.medSystems} columns={columns} />;
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
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminMedSystems)