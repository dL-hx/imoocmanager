//src\pages\ui\loadings.js
import React from "react";
import "./ui.less";
import { Card, Button, Spin, Icon, Alert } from "antd";

export default class Loadings extends React.Component {
  render() {
    const icon = <Icon type="loading" style={{ fontSize: 24 }} />;
    const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />;
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small" />
          <Spin size="default" style={{ margin: "0 10px" }} />
          <Spin size="large" />
          <Spin indicator={icon} style={{ marginLeft: 10 }} />
        </Card>
        <Card title="内容遮罩" className="card-wrap">
          <Alert
            message="React"
            description="欢迎来到React高级实战课程!"
            type="info"
          />

          <Spin>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程!"
              type="warning"
              style={{ marginTop: 10 }}
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert
              message="React"
              description="欢迎来到React高级实战课程!"
              type="warning"
              style={{ marginTop: 10 }}
            />
          </Spin>
          <Spin indicator={iconLoading} tip="加载中...">
            <Alert
              message="React"
              description="欢迎来到React高级实战课程!"
              type="warning"
              style={{ marginTop: 10}}
            />
          </Spin>
        </Card>
      </div>
    );
  }
}