//src/pages/table/basicTable.js
import React from 'react';
import {Card, Table, Modal, Button,message} from 'antd'
import axios from './../../axios/index';
import Utils from './../../utils/utils'
export default class BasicTable extends React.Component {
  state = {
    dataSource2: []
  };

  params = {
    page:1
  };

  componentDidMount() {
    //定义数据源
    const data = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Lily',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      }
    ];
    //动态添加key
    data.map((item,index)=>{
      item.key = index;
    });
    //将数据存入state中保存
    this.setState({
      dataSource: data
    });

    this.request();//初始化调用数据
  }

  // 动态获取mock数据
  request = () => {
    let _this = this;
    axios.ajax({
      url: '/table/list1',
      data: {
        params: {
          page: this.params.page
        },
        // //  增加下方代码,则不会Loading
        // isShowLoading:false
      }
    }).then((res) => {
      if (res.code == 0) {
        res.result.list.map((item,index)=>{
          item.key = index
        });
        this.setState({//页面刷新,不保留选中字段
          dataSource2: res.result.list,
          selectedRowKeys:[],
          selectedRows:null,
          pagination:Utils.pagination(res,(current)=>{
            //@todo
            _this.params.page = current;
            _this.request();
          })
        });

      }
    })
  };

  onRowClick = (record,index)=>{
    let selectKey = [index];
    Modal.info({
      title:'信息',
      content:`用户名:${record.userName},用户爱好:${record.interest}`
    });
    this.setState({
      selectedRowKeys:selectKey,
      selectedItem:record
    })
  };
  //多选执行删除动作
  handleDelete = (()=>{
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item)=>{
      ids.push(item.id)
    });
    Modal.confirm({
      title:"删除提示",
      content:`您确定要删除这些数据吗?${ids.join(',')}`,
      onOk:()=>{
        message.success('删除成功');
        this.request();//删除成功,将页面刷新
      }
    })

  });
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
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state){
          let config = {
            '1':'咸🐟一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(abc){
          let config = {
            '1':'🏊‍',
            '2':'🏀',
            '3':'⚽',
            '4':'🏃',
            '5':'🏔',
            '6':'🚴',
            '7':'🎱',
            '8':'🎤',
          };
          return config[abc];
        }
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
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type:'radio',
      selectedRowKeys
    };

    const rowCheckSelection = {
      type:'check',
      selectedRowKeys,
      onChange:(selectedRowKeys,selectedRows)=>{
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    };
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
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" style={{margin: '10px 0'}}>
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record,index) => {
              return {
                onClick: ()=>{
                  this.onRowClick(record,index);
                }
              };
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-复选" style={{margin: '10px 0'}}>
          <div style={{marginBottom:10}}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}

            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        <Card title="Mock-表格分页" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}
