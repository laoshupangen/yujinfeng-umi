import { Table, Input, InputNumber, Popconfirm, Form ,message} from 'antd';

const data = [];

const EditableContext = React.createContext();

class EditableCell extends React.Component {
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

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editingKey: '' };

    this.columns2 = [...this.props.columns, {
      title: '操作',
      dataIndex: '',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        
        if (text.parentId!==null) {
          return (<div>{editable ? (<span>
            <EditableContext.Consumer>
              {form => (
                <a
                  href="javascript:;"
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                  </a>
              )}
            </EditableContext.Consumer>
            <a onClick={() => this.cancel(record.key)} style={{ marginRight: 8 }}>取消</a>

          </span>
          ) : (
              <a disabled={editingKey !== ''} style={{ marginRight: 8 }} onClick={() => this.edit(record.key)}>
                编辑
            </a>
            )
          }
            <Popconfirm title="确认删除?" onConfirm={() => this.props.handleDelete(record)}>
              <a href="javascript:">删除</a></Popconfirm></div>)

        }else{
          return <div>一级菜单</div>
        }


      },
    },]
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      new Promise((resolve, reject) => {
        this.props.save(row,key)

      }).then((data) => {
          console.log(`after a long time, ${data} returns`);
        }).catch(err=>{
          message.info(`${err}`)
        });
      this.setState({ editingKey: '' });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns2.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.props.data}
          columns={columns}
          pagination={this.props.pagination}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable