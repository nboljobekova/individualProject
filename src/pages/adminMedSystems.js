import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Header from "../components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table, Input, InputNumber, Button, Popconfirm, Form } from 'antd';
import 'antd/dist/antd.css';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: ``,
  });
}

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    renderCell = ({ getFieldDecorator }) => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ],
                initialValue: record[dataIndex],
              })(this.getInput())}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    render() {
      return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
  }

class AdminMedSystems extends Component {
    constructor(props) {
        super(props);
        this.columns = [
        {
            title: '№',
            dataIndex: 'key',
        },      
        {
            title: 'Название системы',
            dataIndex: 'name',
            width: '70%',
            editable: true,
        },
        {
            title: 'Действия',
            dataIndex: 'operation',
            render: (text, record) =>{
                const { editingKey } = this.state;
                const editable = this.isEditing(record);
                return (editable ? (
                    <span>
                    <EditableContext.Consumer>
                        {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.handleSave(form, record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </a>
                        )}
                    </EditableContext.Consumer>
                    <Popconfirm title="Отменить?" onConfirm={() => this.handleCancel(record.key)}>
                        <a>Cancel</a>
                    </Popconfirm>
                    
                    </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => this.handleEdit(record.key)}>
                    <FontAwesomeIcon icon={ faEdit } color="orange" size='lg' />
                    </a>
                )
                );

            }
        },
        ];

        this.state = {
        dataSource: [
            {
            key: '1',
            name: '',
            },
        ],
        count: 2,
        editingKey: '' 
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
        key: count,
        name: ``,
        };
        this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
        ...item,
        ...row,
        });
        this.setState({ dataSource: newData });
    };

    handleCancel = () => {
        this.setState({ editingKey: '' });
    };

    handleEdit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
        };
        const columns = this.columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
            editing: this.isEditing(record),
            }),
        };
        });
        return (
            <Container>
                <Header />
                <Row className="d-flex flex-column p-3">
                <h2 className="d-flex justify-content-center my-4 mx-auto">Список систем</h2>
                    <div >
                        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add a row
                        </Button>
                        <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        />
                    </div>
                </Row>
            </Container>
        );
    }
}

export default AdminMedSystems;