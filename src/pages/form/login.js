//src/pages/form/login.js
import React from "react";

import {Button, Card, Checkbox, Form, Icon, Input, message} from "antd";

const FormItem = Form.Item;

class FormLogin extends React.Component {
  handleSubmit = () => {//绑定提交事件进行校验
    let userInfo = this.props.form.getFieldsValue();//object对象
    this.props.form.validateFields((err, values) => {
      if (!err) {//全部通过 ${}  是变量
        message.success(`${userInfo.userName} 恭喜你,您通过本次表单组件学习,当前密码为:${userInfo.userPwd}`)
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名"/>
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{marginTop: 10}}>
          <Form layout="horizontal" style={{width: 300}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      min: 5, max: 10,
                      message: '长度不在范围内'
                    },
                    {
                      // pattern: /^\w+$/g,
                      pattern: new RegExp('^\\w+$', 'g'),
                      message: '用户名必须为字母或数字'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                )
              }

            </FormItem>
            <FormItem>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '密码不能为空'
                  }]
                })(
                  <Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>
                )
              }

            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName:'checked',
                  initialValue: true,
                  rules: [{
                    required: true,
                    message: '密码不能为空'
                  }]
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#" style={{float:'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin);