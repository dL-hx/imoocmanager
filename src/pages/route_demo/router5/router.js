import React from "react";
import { HashRouter as Router, Route ,Switch} from "react-router-dom";
import Info from "./info";
import Topic from "./../router1/Topic";
import About from "./../router1/About";
import Main from "./Main";
import Home from "./Home";
import NoMatch from "./NoMatch";
/* 1.添加不存在的路由 imooc  
  2.配置404页 
          <Route component={NoMatch}/>
 3. 定义NoMatch(组件)    即404页
 4.在路由中导入  NoMatch组件
  + import NoMatch from "./NoMatch"; 

5.添加Switch防止出现多个页面
+ import { HashRouter as Router, Route ,Switch} from "react-router-dom";
---------------
定义NoMatch(组件)    即404页
*/
export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Switch>
            <Route
              path="/main"
              render={() => (
                <Main>
                  {/* <div>this is a subchild element</div> */}
                  <Route path="/main/:value" component={Info} />
                </Main>
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topic} />

            <Route component={NoMatch} />
          </Switch>
        </Home>
      </Router>
    );
  }
}
