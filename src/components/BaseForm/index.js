// src/components/BaseForm/index.js
import React from 'react';
import {Input, Select, Form, Button, Checkbox, Radio, DatePicker} from "antd";
import Utils from '../../utils/utils';

const FormItem = Form.Item;

class FilterForm extends React.Component {

  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();// 获取表单的值
    this.props.filterSubmit(fieldsValue); // 将子组件的值传递到父组件(order.js)
  };

  reset = () => {
    this.props.form.resetFields(); // 重置表单的方法
  };

  initFormList = () => {
    const {getFieldDecorator} = this.props.form;
    const formList = this.props.formList; // 从父组件Order.js 中获取该对象进行使用
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || ''; //默认给空字符串
        let placeholder = item.placeholder;
        let width = item.width;

        if (item.type == '城市') {
          const city = <FormItem label="城市" key={field}>
            {
              getFieldDecorator('city',{
                initialValue:'0'
              })(
                <Select
                  style={{width: 80}}
                  placeholder={placeholder}
                >
                  {Utils.getOptionList([{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'上海'},{id:'3',name:'天津'},{id:'4',name:'杭州'}])}
                </Select>
              )
            }
          </FormItem>;
          formItemList.push(city);

        } else if (item.type == '时间查询') {
          const begin_time = <FormItem label="订单时间" key={field}>
            {
              getFieldDecorator('begin_time')(
                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
              )
            }
          </FormItem>;
          formItemList.push(begin_time);

          const end_time = <FormItem label="~" colon={false} key={field}>
            {
              getFieldDecorator('end_time')(
                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
              )
            }
          </FormItem>;
          formItemList.push(end_time);

        } else if (item.type == 'INPUT') {
          // 中括号 [变量]  ,会将其看作变量对待
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Input type='text' style={{width: width}} placeholder={placeholder}/>
              )
            }
          </FormItem>;
          formItemList.push(INPUT);
        } else if (item.type == 'SELECT') {
          // 中括号 [变量]  ,会将其看作变量对待
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Select
                  style={{width: width}}
                  placeholder={placeholder}
                >
                  {Utils.getOptionList(item.list)}
                </Select>
              )
            }
          </FormItem>;
          formItemList.push(SELECT);
        } else if (item.type == 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                valuePropName: 'checked', // 设置checkbox的属性
                initialValue: initialValue // true | false
              })(
                <Checkbox>
                  {label}
                </Checkbox>
              )
            }
          </FormItem>;
          formItemList.push(CHECKBOX);
        } else if (item.type == 'DATE') {
          const Date = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field])(
                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
              )
            }
          </FormItem>;
          formItemList.push(Date);
        }
      });
    }
    return formItemList;
  };

  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(FilterForm);

