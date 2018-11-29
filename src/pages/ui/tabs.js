//src\pages\ui\tabs.js
import React from "react";
import "./ui.less";
import { Card, Tabs, message, Icon } from "antd";
const TabPane = Tabs.TabPane;
export default class Tabs1 extends React.Component {
  newTabIndex = 0;
  componentWillMount() {
    const panes = [
      {
        title: "Tab 1",
        content: "Tab 1",
        key: "1"
      },
      {
        title: "Tab 2",
        content: "Tab 2",
        key: "2"
      },
      {
        title: "Tab 3",
        content: "Tab 3",
        key: "3"
      }
    ];
    this.setState({
      activeKey: panes[0].key,
      //   panes: panes
      panes
    });
  }
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: "New Tab Pane", key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  };
  onChange = activeKey => {
    this.setState({
      activeKey
    });
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  handleCallback = key => {
    //   console.log(key)
    message.info("Hi,您选择了页签: " + key);
  };
  render() {
    return (
      <div>
        <Card title="Tabs页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="Tab 1" key="1">
              欢迎学习React课程
            </TabPane>
            <TabPane tab="Tab 2" key="2" disabled>
              欢迎学习React课程
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              React是一门非常受欢迎的MV*框架
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图标页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane
              tab={
                <span>
                  <Icon type="plus" />
                  Tab 1
                </span>
              }
              key="1"
            >
              创建属于你的React项目
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />
                  Tab 2
                </span>
              }
              key="2"
            >
              尝试如何使用React进行修改
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="delete" />
                  Tab 3
                </span>
              }
              key="3"
            >
              删除它，就这么简单
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab可关闭卡片式页签" className="card-wrap">
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            onEdit={this.onEdit}
            type="editable-card"
          >
            {this.state.panes.map(panel => (
              <TabPane tab={panel.title} key={panel.key}>
                {panel.content}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    );
  }
}
