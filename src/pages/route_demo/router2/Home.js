import React from "react";
import { Link } from "react-router-dom"; //引入路由


export default class Home extends React.Component {
  //默认输出 对象{}
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home1</Link>
          </li>
          <li>
            <Link to="/about">About1</Link>
          </li>
          <li>
            <Link to="/topics">Topics1</Link>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
