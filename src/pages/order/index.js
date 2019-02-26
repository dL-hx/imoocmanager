// src/pages/order/index.js
import React from 'react';
import {Card, Table, Form, Modal, Button, message, Select, DatePicker,} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from "../../components/ETable"

const FormItem = Form.Item;

export default class Order extends React.Component {
  state = {
    orderInfo: {},
    orderConfirmVisble: false
  };

  params = {
    page: 1
  };

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field:'city',
      placeholder:'全部',
      initialValue:'1',
      width:80,
      list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'上海'}]
    },
/*    {
      type: 'INPUT',
      label: '模式',
      field:'mode',
      placeholder:'请输入模式',
      width:100,
    },*/
    {
      type: '时间查询',
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field:'order_status',
      placeholder:'全部',
      initialValue:'1',
      width:100,
      list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
    },
  ];

  componentDidMount() {
    this.requestList();
  }

  handleFilter = (params) => {
    this.params = params; // 从子组件传来的值赋值给 params
    this.requestList();
  };

  // 默认请求我们的接口数据
  requestList = () => {
    axios.requestList(this, '/order/list',this.params,true)
/*    axios.ajax({
      url: '/order/list',
      data: {
        params: this.params
      }
    }).then((res) => {
      let list = res.result.item_list.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list: list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current;
          _this.requestList();
        })
      });
    });*/
  };

  // 订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单进行结束'
      });
      return;
    }

    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
        if (res.code == 0) {
          this.setState({
            orderInfo: res.result,
            orderConfirmVisble: true,
          });
        }
      }
    );
  };

  // 结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        message.success('订单结束成功');
        this.setState({
          orderConfirmVisble: false
        });
        this.requestList();
      }
    });
  };

/*  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };

  onSelectChange = (selectedRowKeys, selectedItem) => {
    const record = selectedItem[0];
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedItem: record
    });
  };*/

  // 订单详情页
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      });
      return;
    }
    // 通过window.open 进行路由的跳转
    window.open('/#/common/order/detail/' + item.id, '_blank');
  };

  render() {
 /*   const selectedRowKeys = this.state.selectedRowKeys;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange
    };*/


    const columns = [{
      title: '订单编号',
      dataIndex: 'order_sn'
    }, {
      title: '车辆编号',
      dataIndex: 'bike_sn',
      width: 100,
    }, {
      title: '用户名',
      dataIndex: 'user_name'
    }, {
      title: '手机号',
      dataIndex: 'mobile'
    }, {
      title: '里程',
      dataIndex: 'distance',
      render(distance) {
        return (distance / 1000) + " " + "km";
      }
    }, {
      title: '行程时长',
      dataIndex: 'total_time'
    }, {
      title: '状态',
      dataIndex: 'status',
      render(status) {
        return status == 1 ? '进行中' : '行程结束';
      }
    }, {
      title: '开始时间',
      dataIndex: 'start_time'
    }, {
      title: '结束时间',
      dataIndex: 'end_time'
    }, {
      title: '订单金额',
      dataIndex: 'total_fee'
    }, {
      title: '实付金额',
      dataIndex: 'user_pay'
    }];

    //{...this.state.orderInfo}
    // 这个用法 相当于 从state 中取出 orderInfo 这个对象, 然后将其(this.state.orderInfo)展开
    // 在子组件 ,使用props进行解构


    /*
    * var a = {b:[{id: 27296, bike_sn: "800116116"},{name:"张三"}]}
    * console.log(a.b) // => [0:{id: 27296, bike_sn: "800116116"},
    *                         1:{name:"张三"}
    *                        ]
    *
    * console.log(...a.b) // {id: 27296, bike_sn: "800116116"}
    *                        {name:"张三"}
    */
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>

        <Card style={{marginTop: 10}} >
          <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
          <Button type="primary" style={{marginLeft: 20}} onClick={this.handleConfirm}>结束详情</Button>
        </Card>

        <div className="content-wrap">
          <ETable
            columns={columns}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            //selectedIds={this.state.selectedIds}
            selectedItem={this.state.selectedItem}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
 {/*       <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}

            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </div>*/}
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false
            });
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <OpenCityForm {...this.state.orderInfo} />
        </Modal>
      </div>
    );
  }
}


//子组件二：开通城市

class OpenCityForm extends React.Component {
  render() {
    // console.log(this.props); // => {form: {…}, id: 27296, bike_sn: "800116116", battery: 100, start_time: "1972-07-26 03:08:22", …}
    const {bike_sn, battery, start_time, location} = this.props;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };

    return (
      <Form>
        <FormItem label="车辆编号" {...formItemLayout}>
          {bike_sn}
        </FormItem>
        <FormItem label="剩余电量" {...formItemLayout}>
          {battery + "%"}
        </FormItem>
        <FormItem label="行程开始时间" {...formItemLayout}>
          {start_time}
        </FormItem>
        <FormItem label="当前位置" {...formItemLayout}>
          {location}
        </FormItem>
      </Form>
    );
  }
}

OpenCityForm = Form.create({})(OpenCityForm);