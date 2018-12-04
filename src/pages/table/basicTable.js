//src/pages/table/basicTable.js
import React from 'react';
import {Card, Table} from 'antd'

export default class BasicTable extends React.Component {
  state={};
  componentDidMount() {
    //定义数据源
    const data = [
      {
        id:'0',
        userName: 'Jack',
        sex:'1',
        state:'1',
        interest:'1',
        birthday:'2000-01-01',
        address:'北京市海淀区奥林匹克公园',
        time:'09:00'
      },
      {
        id:'1',
        userName: 'Tom',
        sex:'1',
        state:'1',
        interest:'1',
        birthday:'2000-01-01',
        address:'北京市海淀区奥林匹克公园',
        time:'09:00'
      },
      {
        id:'2',
        userName: 'Lily',
        sex:'1',
        state:'1',
        interest:'1',
        birthday:'2000-01-01',
        address:'北京市海淀区奥林匹克公园',
        time:'09:00'
      }
    ];
    //将数据存入state中保存
    this.setState({
      dataSource:data
    });
  }

  render() {
    /*title:'id',       展示表头显示内容显示id
      dataIndex:'id'    返回的索引值

      */
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex'
      },
      {
        title: '状态',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest'
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ];
    //bordered    配置边框
    //不显示分页     去掉分页
    // +   pagination={false}
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          >

          </Table>
        </Card>
      </div>
    );
  }
}

