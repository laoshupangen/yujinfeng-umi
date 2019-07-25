import Scard from '@/components/Scard.js'
import { Card } from 'antd'

function CampusDetail(props) {
    const gridStyle = {
        width: '90px',
        height: '90px',
        textAlign: 'center',
        padding: '24px 0'
        // boxShadow:'none'
    };
    const headStyle = {
        textAlign: 'center'
    }
    const title = 'XX楼栋'
    return (
        <div>
            <div style={{background:'#f0f2f5',padding:'5px 10px'}}><a>返回至上一页</a></div>
            <Card title="前湖校区" extra={<span style={{padding:'0',}}>操作</span>} headStyle={{height:'40px',lineHeight:'40px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card bordered={false} title="男宿舍楼" headStyle={headStyle} style={{ width: '360px' }}>
                        <Card.Grid style={gridStyle}>
                            <Scard title={title}></Scard>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Scard title={title}></Scard>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Scard title={title}></Scard>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Scard title={title}></Scard>
                        </Card.Grid>
                    </Card>
                    <Card bordered={false} title="女宿舍楼" headStyle={headStyle} >
                        <Card.Grid style={gridStyle}>
                            <Scard></Scard>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Scard></Scard>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Scard></Scard>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Scard></Scard>
                        </Card.Grid>
                    </Card>

                </div>


            </Card>
            <Card title="前湖校区" extra={<span style={{padding:'0',}}>操作</span>} headStyle={{height:'40px',lineHeight:'40px'}}>

            </Card>

        </div>

    )

}
export default CampusDetail