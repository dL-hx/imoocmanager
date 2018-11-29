import React from "react";

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
        404 No Pages.
      </div>
    );
  }
}
