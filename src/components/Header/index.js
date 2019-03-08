// src/components/Header/index.js
import React from "react";
/*
Header组件 分两部分建立两行Row
第一行是用户的个人信息(这里以后要通过变量传输进来)
* */
import {Row, Col, Modal} from "antd";
import "./index.less";
import Util from "../../utils/utils"; //导入公共机制
import axios from "../../axios"; //引入axios组件
import {connect} from "react-redux";
import {switchMenu} from "../../redux/action"; //连接器
import {Menu} from "antd/lib/menu";
import MenuConfig from "./../../config/menuConfig"; //导入menuConfig这个文件


class Header extends React.Component {
  //声明 state变量 在setState之前要声明变量
  state = {};

  componentWillMount() {
    this.setState({
      userName: "太阳王子",
    });
    /*
        创建定时器,每隔一秒获取时间
        * 获取时间的方法
        */
    setInterval(() => {
      // new Date();
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime
      });
    }, 1000);
    this.getWeatherAPIData(); //在这里调用下天气
  }

  // 处理页面刷新的修改面包屑的代码
  handleMenUpdate = (data) => {
    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    const {dispatch} = this.props;

    let obj = []; //创建数组,将需要的数据放入其中,代码无形中使用了工厂模式👍,将需要值进行了处理
    data.map(item => {
      if (item.children) {// 如果有children属性,将其展开放入数组中
        obj.push(...item.children);
      } else{
        obj.push(item);
      }
    });
    const menuName = obj;
    menuName.forEach((item)=>{
      if(currentKey==item.key){
        dispatch(switchMenu(item.title))
      }
    })
  };

  /* 判断页面是否刷新,定义生命周期方法 ,如果页面刷新,重新给menuName值*/
  componentDidMount() {
    this.handleMenUpdate(MenuConfig);
  }

  /*定义得到API天气的方法*/
  getWeatherAPIData() {
    //通过jsonp的方式  调用百度Api接口
    //1.安装jsonp插件             yarn add jsonp --save
    //2.对jsonp插件进行的封装   新建文件夹axios-----index.js
    //3.通过axios插件来发送jsonp()方法
    //通过字符串的方式发送url
    //地区动态储存,定义变量   city            // url:'http://api.map.baidu.com/telematics/v3/weather?location='+this.city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    //对中文进行编码,转为页面字符
    // 编码后通过   .then  进行接收

    let city = "咸阳";

    axios
      .jsonp({
        // url:'http://api.map.baidu.com/telematics/v3/weather?location='+this.city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        url:
          "http://api.map.baidu.com/telematics/v3/weather?location=" +
          encodeURIComponent(city) +
          "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
      })
      .then(res => {
        //通过这里拿到返回值,可以先看下返回值是什么

        if (res.status == "success") {
          //状态成功取得数据进行使用
          let data = res.results[0].weather_data[0];
          this.setState({
            //将状态设置进去
            date: data.date,
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather
          });
        }
      });
  }

  showExitConfirm = () => {
    Modal.confirm({
      title: "是否确定退出系统?",
      onOk() {
        window.location.href = "/#/login";
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  render() {
    // 取出menuType 用作二级导航(父组件Common.js传来)
    const menuType = this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
          {menuType ? (
            <Col span="6" className="logo">
              <img src="/assets/logo-ant.svg" alt=""/>
              <span>IMooc 通用管理系统</span>
            </Col>
          ) : (
            ""
          )}
          <Col span={menuType ? 18 : 24}>
            <span>欢迎, {this.props.userName || this.state.userName} </span>
            <a onClick={this.showExitConfirm}>退出</a>
          </Col>
        </Row>
        {menuType ? (
          ""
        ) : (
          <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              {/* 首页 */}
              {this.props.menuName}
            </Col>
            <Col span="20" className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-img">
                <img src={this.state.dayPictureUrl} alt=""/>
              </span>
              <span className="weather-detail">
                {this.state.weather}
                {/*{this.state.date}*/}
              </span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

//将state.menuName 绑定到 props 的menuName
const mapStateToProps = state => {
  console.log(state);
  return {
    menuName: state.menuName,
    userName: state.userName
  };
};
export default connect(mapStateToProps)(Header);
