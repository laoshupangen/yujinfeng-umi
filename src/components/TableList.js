import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm } from 'antd'
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};
function showModal() {

}
function handleTableChange() {

}
function TableList(props) {
    const {table,btnFunctions} = props
    return (
        <div>
            {btnFunctions&&<div>{btnFunctions.addBtn&&<Button onClick={showModal}>增加</Button>}</div>}
            <Table
                rowSelection={table.rowSelection}
                columns={table.columns}
                rowKey={record => record.id}
                dataSource={table.data}
                pagination={table.pagination}
                loading={table.loading}
                onChange={handleTableChange}
                bordered
            />
            {
                props.Modal&&<div>test</div>
            }
            {
            props.Modal&&
            <Modal
                title={props.Modal.title}
                visible={props.Modal.visible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                centered
            >
                
            </Modal>
            }
        </div>
    )
}
export default TableList