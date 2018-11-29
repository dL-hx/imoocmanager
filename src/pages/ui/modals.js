import React from "react";
import { Card, Button, Modal } from "antd";
import "./ui.less";
export default class Modals extends React.Component {
  state = {
    //设置默认值
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  };
  handleOpen = type => {
    //带 [] 会将type 当作变量,动态设置属性
    this.setState({
      [type]: true
    });
  };
  handleConfirm=(type)=>{
    // Modal.confirm()
    // Modal['confirm']
    // var a ={
    //     confirm:function(){}
    // }
    // a.confirm()
    // a['confirm']

    //通过type动态调用函数
    // -  Modal.confirm({
    // +  Modal[type]({
    Modal[type]({
      title:'确认',
      content:'你确定学会React了吗',
      onOk(){
        console.log('Ok');
      },
      onCancel(){
        console.log('Cancel');
      }
    })
  };
  handleOk = () => {
    this.setState({
      showModal1: false
    });
  };
  render() {
    return (
      <div>
        {/* this is modals page. */}
        <Card title="基础模态框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleOpen("showModal1")}>
            Open
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal2")}>
            自定义页脚
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal3")}>
            顶部20px弹框
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal4")}>
            水平垂直居中
          </Button>
        </Card>
        <Card title="基础模态框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleConfirm("confirm")}>
            Confirm
          </Button>
          <Button type="primary" onClick={() => this.handleConfirm("info")}>
            Info
          </Button>
          <Button type="primary" onClick={() => this.handleConfirm("success")}>
            Success
          </Button>
          <Button type="primary" onClick={() => this.handleConfirm("error")}>
            Error
          </Button>
          <Button type="primary" onClick={() => this.handleConfirm("warning")}>
            Warning
          </Button>
        </Card>
        <Modal
          title="React"
          visible={this.state.showModal1}
          onOk={() => {
            this.setState({
              showModal1: false
            });
          }}
          onCancel={() => {
            this.setState({
              showModal1: false
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal2}
          okText="好的"
          cancelText="算了"
          onOk={() => {
            this.setState({
              showModal2: false
            });
          }}
          onCancel={() => {
            this.setState({
              showModal2: false
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
         
        <Modal
          title="React"
          style={{ top: 20 }}
          visible={this.state.showModal3}
          onOk={() => {
            this.setState({
              showModal3: false
            });
          }}
          onCancel={() => {
            this.setState({
              showModal3: false
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onOk={() => {
            this.setState({
              showModal4: false
            });
          }}
          onCancel={() => {
            this.setState({
              showModal4: false
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
      </div>
    );
  }
}
