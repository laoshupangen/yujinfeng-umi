import Link from 'umi/link';
import {Layout} from 'antd';
const {Sider,Content,Header} = Layout



export default function() {
  return (
    <Layout>
      <Sider theme="light" style={{height:'100vh',overflow:'auto'}}>
        
      </Sider>
      <Layout>
        <Header style={{background:'#fff'}}>

        </Header>
        <Content>

        </Content>
      </Layout>
     
      
    </Layout>
    
  );
}
