import { Table, Button, Modal, Select, TreeSelect, Icon, Cascader } from 'antd'
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};
function showModal() {

}

function TableList(props) {
    const { table, btnFunctions } = props
    function refresh() {
        window.location.reload()
    }
    function treeChange() {

    }
    function selectChange() {

    }
    const gender = [{
        value: '男生',
        key: '1',
    }, {
        key: '2',
        value: '女生'
    }]
    const options = [
        {
            value: '2344',
            label: '1栋',
            children: [
                {
                    value: '23441',
                    label: '第一层',
                },
            ],
        },
        {
            value: '2345',
            label: '2栋',
            children: [
                {
                    value: '23451',
                    label: '第一层',
                },
            ],
        },
    ];
    function cascaderChange() {

    }
    
    // const treeData =;
    return (
        <div>
            <div style={{ padding: '10px' }}>
                {btnFunctions.addBtn && <Button style={{ marginRight: '10px' }}>增加</Button>}
                {btnFunctions.refreshBtn && <Button style={{ marginRight: '10px' }} onClick={refresh} type="primary"><Icon type="redo"></Icon></Button>}
                {btnFunctions.confirmBtn && <Button style={{ marginRight: '10px' }} disabled={btnFunctions.confirmBtn.disabled} onClick={btnFunctions.confirmBtn.confirm} type="primary">确认分配</Button>}
                {/* {table.treeSelect && <TreeSelect treeData={table.treeSelect.treeData} style={{ width: 200, marginRight: '10px' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder={table.treeSelect.placeholder} onChange={treeChange}></TreeSelect>}
                {table.select && <Select placeholder={table.select.placeholder} style={{ width: 100, marginRight: '10px' }} onChange={selectChange}>
                    {
                        table.select.selectData.map(g => (<Select.Option key={g.key} value={g.key}>{g.value}</Select.Option>))

                    }
                </Select>}

                {table.Cascader && <Cascader style={{ marginRight: '10px' }} placeholder="选择楼栋/楼层" options={table.Cascader.options} onChange={cascaderChange} changeOnSelect></Cascader>}
                {table.searchBtn && <Button type="primary" ><Icon type="search"></Icon></Button>} */}
            </div>

            <Table
                rowSelection={table.rowSelection}
                columns={table.columns}
                rowKey={record => record.id}
                dataSource={table.data}
                loading={table.loading}
                bordered
            />
            {
                props.Modal && <div>暂无</div>
            }
            {
                props.Modal &&
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