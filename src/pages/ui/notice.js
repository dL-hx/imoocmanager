import React from "react";
import { Card, Button, notification } from "antd";
import "./ui.less";
export default class Notice extends React.Component {
  openNotifications = (type, direction) => {
    if (direction) {
      //如果配置了direction,说明执行了有方向的通知框,将placement设置为当前方向
      notification.config({
        placement:direction
      });
    }
    notification[type]({
      message: "发工资了",
      description: "上个月考勤22天,迟到12天,实发工资250,请笑纳"
    });
  };
  handleOk = () => {};
  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button
            type="primary"
            onClick={() => this.openNotifications("success")}
          >
            Success
          </Button>
          <Button type="primary" onClick={() => this.openNotifications("info")}>
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotifications("warning")}
          >
            Warning
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotifications("error")}
          >
            Error
          </Button>
        </Card>
        <Card title="通知提醒框-方向控制" className="card-wrap">
          <Button
            type="primary"
            onClick={() => this.openNotifications("success", "topLeft")}
          >
            Success-TopLeft
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotifications("info", "topRight")}
          >
            Info-TopRight
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotifications("warning", "bottomLeft")}
          >
            Warning-BottomLeft
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotifications("error", "bottomRight")}
          >
            Error-BottomRight
          </Button>
        </Card>
      </div>
    );
  }
}