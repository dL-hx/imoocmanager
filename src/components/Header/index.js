import React from 'react';
/*
Header组件 分两部分建立两行Row
第一行是用户的个人信息(这里以后要通过变量传输进来)
* */
import {Row, Col} from "antd";
import './index.less'
import Util from '../../utils/utils'//导入公共机制
import axios from "../../axios";//引入axios组件

export default class Header extends React.Component {
    //声明 state变量 在setState之前要声明变量
    state = {};


    componentWillMount() {
        this.setState({
            userName: '太阳王子'
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
            })
        }, 1000);
        this.getWeatherAPIData();//在这里调用下天气
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

        let city = '咸阳';

        axios.jsonp({
            // url:'http://api.map.baidu.com/telematics/v3/weather?location='+this.city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {//通过这里拿到返回值,可以先看下返回值是什么

            if (res.status == 'success') {//状态成功取得数据进行使用
                let data = res.results[0].weather_data[0];
                this.setState({//将状态设置进去
                    date:data.date,
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎,{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
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
            </div>
        );
    }
}