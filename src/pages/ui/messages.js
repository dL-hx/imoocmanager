//src\pages\ui\messages.js
import React from "react";
import "./ui.less";
import {Card, Button, message} from "antd";

export default class Messages extends React.Component {
  showMeassage = type => {
    message[type]("恭喜你，React课程晋级成功.");
  };

  render() {
    return (
      <div>
        <Card title="全局提示框" className="card-wrap">
          <Button type="primary" onClick={() => this.showMeassage("success")}>
            Success
          </Button>
          <Button type="primary" onClick={() => this.showMeassage("info")}>
            Info
          </Button>
          <Button type="primary" onClick={() => this.showMeassage("warning")}>
            Warning
          </Button>
          <Button type="primary" onClick={() => this.showMeassage("error")}>
            Error
          </Button>
          <Button type="primary" onClick={() => this.showMeassage("loading")}>
            Loading
          </Button>
        </Card>
      </div>
    );
  }
}