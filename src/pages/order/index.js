// src/pages/order/index.js
import React from 'react';
import {Card, Table, Form, Modal, Button, message, Select, DatePicker,} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component {
  state = {
    orderInfo: {},
    orderConfirmVisble: false
  };

  params = {
    page: 1
  };

  componentDidMount() {
    this.requestList();
  }

  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/order/list',
      data: {
        params: {
          page: this.params.page
        }
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
    });
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

  onRowClick = (record, index) => {
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
  };

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
    const selectedRowKeys = this.state.selectedRowKeys;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange
    };


    const columns = [{
      title: '订单编号',
      dataIndex: 'order_sn'
    }, {
      title: '车辆编号',
      dataIndex: 'bike_sn'
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
          <FilterForm/>
        </Card>

        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
          <Button type="primary" style={{marginLeft: 20}} onClick={this.handleConfirm}>结束详情</Button>
        </Card>

        <div className="content-wrap">
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
        </div>
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

//子组件一：选择表单
class FilterForm extends React.Component {
  render() {


    const {getFieldDecorator} = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {
            getFieldDecorator('city_id')(
              <Select
                style={{width: 100}}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="1">北京</Option>
                <Option value="2">天津</Option>
                <Option value="3">深圳</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label="订单时间">
          {
            getFieldDecorator('start_time')(
              <DatePicker
                placeholder="请选择开始时间"
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            )
          }
        </FormItem>

        <FormItem>
          {
            getFieldDecorator('end_time')(
              <DatePicker
                placeholder="请选择结束时间"
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            )
          }
        </FormItem>


        <FormItem label="订单状态">
          {
            getFieldDecorator('order_status')(
              <Select
                style={{width: 150}}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="1">进行中</Option>
                <Option value="2">行程结束</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

FilterForm = Form.create({})(FilterForm);


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