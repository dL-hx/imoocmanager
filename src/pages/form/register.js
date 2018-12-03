//src/pages/form/register.js
import React from 'react';
import {
  Card,
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Icon,
  message,
  InputNumber
} from "antd";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;

class FormRegister extends React.Component {
  state = {};
  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();// 可以(获取表单中)object对象
    console.log(JSON.stringify(userInfo));
    message.success(`${userInfo.userName} 恭喜你,您通过本次表单组件学习,当前密码为:${userInfo.userPwd}`)

  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg: imageUrl,
        loading: false,
      }));
    }
  };

  /*  sm: 12
    sm:{
      span:12
    }

    offset:4 向右偏移4列
 */
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs:24,
        sm:{
          span:12,
          offset:4
        }
      }
    };
    const rowObject = {
      minRows: 4, maxRows: 6
    };


    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                  ]
                })(
                  <Input placeholder="请输入用户名"/>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',

                })(
                  <Input type="password" placeholder="请输入密码"/>
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: "1",
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18',

                })(
                  <InputNumber/>
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '2',
                })(
                  <Select>
                    <Option value="1">咸🐟一条</Option>
                    <Option value="2">风华浪子</Option>
                    <Option value="3">北大才子一枚</Option>
                    <Option value="4">百度FE</Option>
                    <Option value="5">创业者</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['2', '3', '5'],
                })(
                  <Select mode="multiple">
                    <Option value="1">🏊‍</Option>
                    <Option value="2">🏀</Option>
                    <Option value="3">⚽</Option>
                    <Option value="4">🏃</Option>
                    <Option value="5">🏔</Option>
                    <Option value="6">🚴</Option>
                    <Option value="7">🎱</Option>
                    <Option value="8">🎤</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Switch/>
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-08-08 12:00:59'),
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: "北京市海淀区奥林匹克公园",
                })(
                  <TextArea
                    autosize={rowObject}
                  />
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time', {
                  initialValue: moment('09:30:00', "HH:mm:ss"),
                })(
                  <TimePicker/>
                )
              }
            </FormItem>
            {/*showUploadList:是否展示上传列表*/}
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.handleChange}
                  >
                    {this.state.userImg ? <img src={this.state.userImg}/> : <Icon type="plus"/>}

                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('register', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegister);