// src/pages/map/bikeMap.js
import React from 'react';
import {Card, Form} from 'antd';
import BaseForm from './../../components/BaseForm';
import axios from './../../axios';

export default class BikeMap extends React.Component {

  state = {};

  map = '';

  formList = [
    {
      type: '城市'
    }, {
      type: '时间查询'
    }, {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '0',
      list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '行程结束'}],
      width: 100
    }
  ];


  componentWillMount() {
    this.requestList();
  }

  // 查询列表数据
  requestList = () => {
    axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          total_count: res.result.total_count,
        });
        this.renderMap(res);
      }
    });
  };

  // 查询表单
  handleFilter = (filterParams) => {
    this.params = filterParams;
    // 点击查询,调用查询数据接口
    this.requestList();
  };

  // 渲染地图数据
  renderMap = (res) => {
    let list = res.result.route_list;// 拿到route_list数据
    this.map = new window.BMap.Map('container');         //================1(初始化地图)
    let gps1 = list[0].split(',');
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);// 起始坐标(0:经度,1:纬度)
    let gps2 = list[list.length - 1].split(',');
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);// 终点坐标
    this.map.centerAndZoom(endPoint, 11); // 保证地图居中           // ==============2


    //起点 -- 图标Icon/覆盖物Marker/添加addOverlay
    let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), { // 设置图片样式
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42) // 偏移
    });

    let bikeMarkerStart = new window.BMap.Marker(startPoint, {icon: startPointIcon});
    this.map.addOverlay(bikeMarkerStart);


    // 终点
    let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {icon: endPointIcon});
    this.map.addOverlay(bikeMarkerEnd);


    bikeMarkerEnd.addEventListener("click", function (e) {
      alert("当前位置：" + e.point.lng + ", " + e.point.lat);
    });


    // 绘制车辆行驶路线
    let routeList = [];
    /*    for(let i = 0 ; i < list.length - 1; i++){
            let item = list[i]; // 拿到每一个坐标点
            let p= item.split(',')
            // 转换为 地图api 需要的坐标点, 存入 trackPoint 数组
            routeList.push(new window.BMap.Point(p[0],p[1]))
        }
     */

    list.forEach((item) => {
      let p = item.split(','); // 拿到每一个坐标点
      routeList.push(new window.BMap.Point(p[0], p[1]));
    });
    // 画折线
    let polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 2,
      strokeOpacity: 1
    });

    this.map.addOverlay(polyLine);


    // 绘制服务区
    let servicePointList = [];
    let serviceList = res.result.service_list;
    serviceList.forEach((item) => {
      servicePointList.push(new window.BMap.Point(item.lon, item.lat));
    });
    // 画折线
    let polyServiceLine = new window.BMap.Polyline(servicePointList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    });

    this.map.addOverlay(polyServiceLine);

    // 添加地图中的自行车图标
    let bikeList = res.result.bike_list;
    let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    bikeList.forEach((item) => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      let bikeMarker = new window.BMap.Marker(point, {icon: bikeIcon});
      this.map.addOverlay(bikeMarker);
    });

    // 添加地图控件(设置控件位置)
    this.map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    this.map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
  };

  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{height: 500}}></div>
        </Card>
      </div>
    );
  }
}