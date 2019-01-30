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
        this.renderMap(res.result);
      }
    });
  };

  // 初始化地图
  renderMap = (result) => {
    this.map = new window.BMap.Map('orderDetailMap');//new BMap.Map('orderDetailMap',,{enableMapClick:false});地图无法点击
    // this.map.centerAndZoom('北京', 11);
    // 添加地图控件
    this.addMapControl();
    // 调用路线图绘制方法
    this.drawBikeRoute(result.position_list); // 初始化完成绘制路线图

    // 调用服务区绘制方法
    this.drawServiceArea(result.area);
  };

  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
  };

  // 绘制用户的行驶路线
  // 需要坐标点(positionList)做参数
  drawBikeRoute = (positionList) => {
    let map = this.map; // 通过map 拿到地图的对象
    let startPoint = '';
    let endPoint = '';
    if (positionList.length > 0) {
      let first = positionList[0]; // 第一个坐标点
      let last = positionList[positionList.length - 1]; // 第一个坐标点
      startPoint = new window.BMap.Point(first.lon, first.lat); // arr.lon 经度 arr.lat 纬度

      // 创建起始坐标点的图标(Icon),设置Icon图标的大小(宽:36,高:42)
      let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
        // 控件中图片的大小
        imageSize: new window.BMap.Size(36, 42),

        // 停靠的位置
        anchor: new window.BMap.Size(36, 42)
      });


      // 创建标注
      // 定义Marker 将图标放入页面(坐标点,图标)
      let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon});

      // 将标注添加到地图中
      this.map.addOverlay(startMarker);


      endPoint = new window.BMap.Point(last.lon, last.lat);

      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        // 控件中图片的大小
        imageSize: new window.BMap.Size(36, 42),

        // 停靠的位置
        anchor: new window.BMap.Size(36, 42)
      });

      let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon});

      this.map.addOverlay(endMarker);

      // 连接路线图
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        // 换了个名称,用point 代替positionList 显得简洁
        let point = positionList[i];
        // 将接口返回的坐标点,转换为百度地图api 需要的坐标点
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));

        // 画折线
        // 线的颜色,宽度,透明度
        let polyline = new window.BMap.Polyline(trackPoint, {
          strokeColor: '#1869AD',
          strokeWeight: 3,
          strokeOpacity: 1
        });

        this.map.addOverlay(polyline);
      }

      // 生成地图的中心点
      this.map.centerAndZoom(endPoint, 11);
    }
  };

  // 绘制服务区
  drawServiceArea = (positionList) => {
    // 连接路线图
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      // 换了个名称,用point 代替positionList 显得简洁
      let point = positionList[i];
      // 将接口返回的坐标点,转换为百度地图api 需要的坐标点
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }

    // 绘制服务区       fillColor 填充颜色
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor:'#ff8605',
      fillOpacity:0.4
    });

    this.map.addOverlay(polygon);
  };

  render() {
    const info = this.state.orderInfo || {};//如果orderInfo 为空,返回 {}
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className='order-map'></div>
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