//src/axios/index.js
//对jsonp的方法进行封装
import JsonP from "jsonp";//*导入jsonp的插件
import axios from 'axios';//*导入axios插件
import {Modal} from "antd";
import Utils from "../utils/utils";
//导出一个对象供其他对象进行使用
export default class Axios {
  // _this: this ,url:接口的url, params:需要传递到接口的数据, isMock:是否为Mock数据
  // 定义方法,为请求的列表使用
  static requestList(_this, url, params,isMock){
    var data = {
      params: params,
      isMock // 使用Mock数据
    };

    // 调用ajax 拦截公共机制
    // ES6省略语法
    // 相当于 url:url
    this.ajax({
      url,
      data
    }).then((data) => { //得到数据data
      if (data && data.result) {
        // 如果data 是true 进行操作
        let list = data.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        _this.setState({
          list,
          pagination: Utils.pagination(data, (current) => {
            _this.params.page = current;
            _this.requestList();
          })
        });
      }
    });
  };

  static jsonp(options) {//定义静态的方法   jsonp  供其他页面进行使用
    return new Promise((resolve, reject) => {//使用Promise解决函数间的嵌套问题   链式调用
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        //to-do
        //传入JsoP的对象进行操作
        //如果返回的对象是成功,使用resolve方法进行返回
        //debugger;//通过这个打断点
        if (response.status == 'success') {//成功后  用resolve返回数据
          resolve(response);
        } else {    //失败后用reject返回数据
          reject(response.message);
        }
      });
    });
  }

  static ajax(options) {//封装axios   定义为ajax请求,使用Promise
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseApi = '';
    if (options.isMock) {
      baseApi = 'https://easy-mock.com/mock/5c0893b83b84ee1919884836/mock.api';
    }else {
      // 不是mock数据修改为真实接口
      baseApi = 'https://easy-mock.com/mock/5c0893b83b84ee1919884836/mock.api';
    }

    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status == '200') {
          let res = response.data;
          if (res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
}