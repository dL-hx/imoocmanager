import React from "react";
import { HashRouter as Router, Route } from "react-router-dom"; //导入路由,为HashRouter起别名:  Router
import About from "./../router1/About";
import Topic from "./../router1/Topic";
import Main from "./Main";
import Home from "./Home"; //4.0允许在路由中嵌套标签组件    这里是嵌套<Home>组件
/* 嵌套路由中添加 render方法加载
    在子组件中进行嵌套路由 
*/
export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Route
            path="/main"
            render={() => 
              <Main>
                {/* <div>this is a subchild element</div> */}
                <Route path="/main/a" component={About} />
              </Main>
            }
          />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topic} />
        </Home>
      </Router>
    );
  }
}
