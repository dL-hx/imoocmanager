// src/components/NavLeft/index.js
import React from "react";
import MenuConfig from "./../../config/menuConfig"; //导入menuConfig这个文件
import {Menu, Icon} from "antd"; //导入子组件菜单
import {NavLink} from "react-router-dom";
import "./index.less";
import {connect} from "react-redux"; // 连接器
import {switchMenu} from "./../../redux/action"; //事件行为

const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
  state = {
    currentKey: ""
  };
  handleClick = ({item, key}) => {
    if (key === this.state.currentKey) {
      return false;
    }
    // 事件派发，自动调用reducer，通过reducer保存到store对象中
    const {dispatch} = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key
    });
  };

  /*
   * 获取到对象后,可以通过setState将对象存进去 ,这是React的一个特色
   * */
  componentWillMount() {
    //通过MenuConfig读取文件
    //通过递归(遍历)实现菜单(是一个List)的渲染
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    //通过setState存入state
    this.setState({
      currentKey,
      menuTreeNode
    });
  }

  homeHandleClick = () => {
    const {dispatch} = this.props;
    dispatch(switchMenu('首页'));
    this.setState({
      currentKey: ""
    });
  };

  //菜单渲染
  renderMenu = data => {
    return data.map(item => {
      //如果item有子元素,遍历自己,再次调用,直到子节点加载完毕
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    // var style = {
    //     backgroundColor:'red'
    // }
    return (
      <div>
        <NavLink to="/home" onClick={this.homeHandleClick}>
          <div className="logo">
            <img src="/assets/logo-ant.svg" alt=""/>
            <h1>Imooc MS</h1>
          </div>
        </NavLink>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.currentKey]}
          theme="dark"
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
