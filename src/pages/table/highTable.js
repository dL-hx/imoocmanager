//src/pages/table/highTable.js
import React from 'react';
import {Card, Table, Modal, Button, message, Badge} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils'

export default class HighTable extends React.Component {
  state = {};
  params = {
    page: 1
  };

  componentDidMount() {
    this.request();
  }

  // 动态获取mock数据
  request = () => {
    axios.ajax({
      url: '/table/high/list',
      data: {
        params: {
          page: this.params.page
        },
        // //  增加下方代码,则不会Loading
        // isShowLoading:false
      }
    }).then((res) => {
      if (res.code == 0) {
        res.result.list.map((item, index) => {
          item.key = index
        });
        this.setState({//页面刷新,不保留选中字段
          dataSource: res.result.list,
        });

      }
    })
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('sorter: ', sorter.order);
    this.setState({
      sortOrder: sorter.order,
    });
  };

  //删除操作
  handleDelete = (item) => {
    let id = item.id;
    Modal.confirm({
      title: "确认",
      content: '您确认要删除第'+id+'条数据吗',
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    })
  };

  render() {
    const columns1 = [
      {
        title: 'id',
        key: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        width: 80,
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸🐟一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        width: 80,
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': '🏊‍',
            '2': '🏀',
            '3': '⚽',
            '4': '🏃',
            '5': '🏔',
            '6': '🚴',
            '7': '🎱',
            '8': '🎤',
          };
          return config[abc];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        width: 120,
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        key: 'time',
        width: 120,
        dataIndex: 'time'
      }
    ];

    const columns2 = [
      {
        title: 'id',
        key: 'id',
        width: 80,
        fixed: 'left',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        fixed: 'left',
        width: 80,
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸🐟一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        width: 80,
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': '🏊‍',
            '2': '🏀',
            '3': '⚽',
            '4': '🏃',
            '5': '🏔',
            '6': '🚴',
            '7': '🎱',
            '8': '🎤',
          };
          return config[abc];
        }
      },

      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },

      {
        title: '地址',
        key: 'address',
        width: 120,
        fixed: 'right',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        key: 'time',
        width: 120,
        fixed: 'right',
        dataIndex: 'time'
      }
    ];

    const columns3 = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: this.state.sortOrder,
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸🐟一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': '🏊‍',
            '2': '🏀',
            '3': '⚽',
            '4': '🏃',
            '5': '🏔',
            '6': '🚴',
            '7': '🎱',
            '8': '🎤',
          };
          return config[abc];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        key: 'time',
        dataIndex: 'time'
      }
    ];

    const columns4 = [
      {
        title: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '用户名',
        width: 80,
        dataIndex: 'userName'
      },
      {
        title: '性别',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': "咸🐟一条",
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        width: 80,
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': <Badge status="success" text='🏊‍'/>,
            '2': <Badge status="error" text='🏀'/>,
            '3': <Badge status="default" text='⚽'/>,
            '4': <Badge status="warning" text='🏃'/>,
            '5': <Badge status="processing" text='🏔'/>,
            '6': <Badge status="success" text='🚴'/>,
            '7': <Badge status="error" text='🎱'/>,
            '8': <Badge status="default" text='🎤'/>,
          };
          return config[abc];
        }
      },
      {
        title: '生日',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        width: 120,
        dataIndex: 'address'
      },
      {
        title: '操作',
        width: 120,
        render: (text, item) => {
          return <Button size="small" onClick={() => {
            this.handleDelete(item)
          }}>删除</Button>
        }
      }
    ];
    return (
      <div>
        <Card title="头部固定" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns1}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{y: 240}}
          />
        </Card>
        <Card title="左侧固定" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{x: 1850}}
          />
        </Card>

        <Card title="表格排序" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>

        <Card title="表格操作" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}