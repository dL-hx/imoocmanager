// src/pages/order/detail.js
import React from 'react';
import {Card} from 'antd';
import axios from './../../axios/index';
import './detail.less';

export default class OrderDetail extends React.Component {

  state = {};

  componentDidMount() {
    // 通过this.props.match.params.     取路由中的id(router-v4)
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      this.getDetailInfo(orderId);
    }
  }

  getDetailInfo = (orderId) => {
    axios.ajax({
      url: '/order/detail',
      data: {
        params: {
          orderId: orderId
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          orderInfo: res.result,
        });
      }
    });
  };

  render() {
    const info = this.state.orderInfo || {};//如果orderInfo 为空,返回 {}
    return (
      <div>
        <Card>
          <div id="OrderDetailMap"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{info.mode == 1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程里程</div>
                <div className="detail-form-content">{info.distance / 1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}