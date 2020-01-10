import React, { Component,Fragment } from 'react'
import {Button , Table,Icon,Popconfirm,message,Pagination,Modal } from 'antd';
import axios from 'axios'


export default class UserSet extends Component {
    constructor(){
      super()
      this.state={
        data:[],
        loading: false,
        visible: false,
        name:'',
        pro:''
      }
      this.columns = [
        {
          title: '角色编号',
          key: '_id',
          render:(h)=>{
            return(h._id)
          }
        },
        {
          title: '角色名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '角色描述',
          dataIndex: 'pro',
          key: 'pro',
        },
        {
          title: '操作',
          render:(h)=>{
            return (
              <Fragment>
                <Button type='primary' shape='circle'><Icon type="edit"/></Button>
                <Popconfirm
                  title="确定要删除该角色吗？"
                  onConfirm={()=>{
                      axios.post('/api/user/delaccess',{params:{id:h._id}})
                      axios.get('/api/user/getaccess',{})
                        .then((res)=>{this.setState({data:res.data.list})})
                        .catch((err)=>{console.log(err)})
                        message.success('删除成功')
                      }
                  }
                  onCancel={()=>{
                    message.error('取消删除')
                  }}
                >
                  <Button type='danger' shape='circle'><Icon type="delete"/></Button>
                </Popconfirm>
                <Button type='primary' shape='circle'><Icon type="file-protect"/></Button>
              </Fragment>
            )
          },
          key: 'do',
        }
      ];
      
    }
    componentDidMount(){
      axios.get('/api/user/getaccess',{})
      .then((res)=>{this.setState({data:res.data.list})})
      .catch((err)=>{console.log(err)})
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    handleOk = () => {
      this.setState({ loading: true });
      axios.post('/api/user/addaccess',{params:{name:this.state.name,pro:this.state.pro}})
      axios.get('/api/user/getaccess',{})
      .then((res)=>{this.setState({data:res.data.list})})
      .catch((err)=>{console.log(err)})
      this.setState({ loading: false, visible: false });
      message.success('添加成功')
    }
    handleCancel = () => {
      this.setState({ visible: false });
      message.error('取消添加')
    }
    render() {
      let {data,loading,visible}=this.state
        return (
          <Fragment>
              <Table rowKey={(h)=>{return h._id}} bordered={true} pagination={false} title={()=>{
                  return(
                    <Fragment>
                      <span>列表</span>
                      <div style={{float:'right'}}>
                        <Button onClick={this.showModal}>添加角色</Button>
                                      <Modal
                          visible={visible}
                          title="Title"
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                          footer={[
                            <Button key="back" onClick={this.handleCancel}>
                              Return
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                              Submit
                            </Button>,
                          ]}
                        >
                          <p><span>角色名称：</span><input type="text" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value}) }}/></p>
                          <p><span>角色描述：</span><input type="text" value={this.state.pro} onChange={(e)=>{this.setState({pro:e.target.value}) }}/></p>
                          
                        </Modal>
                      </div>
                    </Fragment>
                  )
              }} dataSource={data} columns={this.columns} />
              <Pagination  />
          </Fragment>
        )
    }
}
