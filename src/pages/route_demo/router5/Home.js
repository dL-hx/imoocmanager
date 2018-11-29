import React from "react";
import { Link } from "react-router-dom"; //引入路由

/* 1.添加不存在的路由 imooc  
  2.配置404页 
          <Route component={NoMatch}/>
 3. 定义NoMatch(组件)    即404页
 4.在路由中导入  NoMatch组件
---------------
定义NoMatch(组件)    即404页
*/
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/main">Home1</Link>
          </li>
          <li>
            <Link to="/about">About1</Link>
          </li>
          <li>
            <Link to="/topics">Topics1</Link>
          </li>
          <li>
            <Link to="/imooc1">Imooc</Link>
          </li>
          <li>
            <Link to="/imooc2">Imooc</Link>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
