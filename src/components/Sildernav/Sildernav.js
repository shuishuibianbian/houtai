import React,{Component} from 'react'
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;
class Sildernav extends Component{
    constructor(){
        super()
        this.state={
            Menudata:[
                {
                    name:'首页',
                    icon:'home',
                    path:'/admin/home',
                    id:'0'
                },
                {
                    name:'权限管理',
                    icon:'setting',
                    path:'/admin/setting',
                    id:'1',
                    children:[
                        {
                            name:'角色列表',
                            icon:'home',
                            path:'/admin/setting/userlist',
                            id:'1-0'
                        },
                        {
                            name:'角色权限',
                            icon:'home',
                            path:'/admin/setting/set',
                            id:'1-1'
                        }
                    ]
                }
            ],
        }
    }
    componentDidMount(){

    }
    renderitem(data){
        if(!data.length) return '暂无数据'
        let result=data.map((item,index)=>{
            if(item.children){
                return(
                    <SubMenu key={item.id}
                    title={
                    <span>
                        <Icon type={item.icon}/>
                        <span>{item.name}</span>
                    </span>
                    }
                >
                    {this.renderitem(item.children)}
                </SubMenu>
                
                )   
            }else{
                return (<Menu.Item key={item.id}><Link to={item.path}><Icon type={item.icon}/>{item.name}</Link></Menu.Item>)
            }
        })
        return result
    }
    render(){
        return(
            <Menu onClick={false} mode="vertical" theme='dark'>
           {this.renderitem(this.state.Menudata)}
          </Menu>
        )
    }
}
export default Sildernav