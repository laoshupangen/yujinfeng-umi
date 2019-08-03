import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm,Icon } from 'antd'
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};
function showModal() {

}

function TableList(props) {
    const {table,btnFunctions,search} = props
   
    table.data = [{id:'22',departments:'test1',specialities:'test',gender:'test',unused:'test',numbers:'1',qualifications:'test',provenance:'tets'}]
    return (
        <div>
            {btnFunctions&&<div style={{padding:'10px'}}>
            {btnFunctions.addBtn&&<Button style={{marginRight:'10px'}}>增加</Button>}
            {btnFunctions.refreshBtn&&<Button style={{marginRight:'10px'}} type="primary"><Icon type="redo"></Icon></Button>}
            {btnFunctions.confirmBtn&&<Button style={{marginRight:'10px'}} type="primary">确认分配</Button>}
            </div>}
            {search&&<div style={{padding:'10px'}}><Input.Search placeholder="角色名称/角色编码" style={{width:'200px'}}/></div>}
            <Table
                rowSelection={table.rowSelection}
                columns={table.columns}
                rowKey={record => record.id}
                dataSource={table.data}
               
                loading={table.loading}
                
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