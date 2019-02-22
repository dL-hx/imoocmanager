// src/pages/permission/index.js
import React from "react";
import { Card, Button, Form, Modal, Input, Select, Tree, Transfer } from "antd";
import ETable from "./../../components/ETable";
import Utils from "./../../utils/utils";
import axios from "./../../axios";
import menuConfig from "./../../config/menuConfig";

const FormItem = Form.Item;
const Option = Select.Option;
const { TreeNode } = Tree;
// 或 const TreeNode = Tree.TreeNode

export default class PermissionUser extends React.Component {
  state = {
    isRoleVisible: false
  };

  componentWillMount() {
    // 通过生命周期函数加载接口
    axios.requestList(this, "/role/list", {}, true);
  }

  requestList = () => {
    axios.requestList(this, "/role/list", {}, true);
  };

  // 打开创建角色弹框
  handleRole = () => {
    this.setState({
      isRoleVisible: true
    });
  };

  // 角色提交
  handleRoleSubmit = () => {
    const data = this.roleForm.props.form.getFieldsValue();
    console.log(data);
    axios
      .ajax({
        url: "/role/create", // //Easy Mock中只有｛"code": 0｝
        data: {
          params: data
        }
      })
      .then(res => {
        if (res.code == 0) {
          this.setState({
            isRoleVisible: false //关闭弹框
          });
          this.roleForm.props.form.resetFields(); // 调用表单重置(清空表单数据)
          this.requestList(); //刷新列表数据
        }
      });
  };

  // 权限设置
  handlePermission = () => {
    let item = this.state.selectedItem; //取出当前选中的项
    if (!item) {
      Modal.info({
        title: "温馨提示",
        content: "请选择一个角色"
      });
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    });
  };

  handlePermEditSubmit = () => {
    // 获取表单的值 ,添加wrappedComponentRef属性
    let data = this.permForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id; // 将角色id传回
    data.munus = this.state.menuInfo; // 需要将menus数据  传到接口

    // 将数据传入接口
    axios
      .ajax({
        url: "/permission/edit",
        data: {
          params: {
            ...data
          }
        }
      })
      .then(res => {
        if (res) {
          // 提交成功,   1. 关闭页面, 2. 重新请求数据
          this.setState({
            isPermVisible: false
          });
          this.requestList(); //刷新列表数据
        }
      });
  };

  // 用户授权
  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "温馨提示",
        content: "请选择一个角色"
      });
      return;
    }

    this.setState({
      isUserVisible: true,
      detailInfo: item
    });
    // 获取目标数据
    this.getRoleUserList(item.id);
  };

  // 获取用户角色列表
  getRoleUserList = id => {
    // id: 角色id , 获取角色id
    axios
      .ajax({
        url: "/role/user_list",
        data: {
          params: {
            id
          }
        }
      })
      .then(res => {
        if (res) {
          //请求成功,筛选目标用户
          this.getAuthUserList(res.result);
        }
      });
  };

  // 筛选目标用户
  getAuthUserList = dataSource => {
    // 将数据(目标用户,全量用户)进行过滤的方法
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      // 有数据
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        };

        if (data.status == 1) {
          // 如果status是1 说明是目标用户,加到targetKeys数组
          targetKeys.push(data.key);
        }
        // 否则 说明是全量数据, 加入全量数组列表
        mockData.push(data);
      }
      // 将全量数据,目标数据存入setState
      this.setState({
        mockData,
        targetKeys
      });
    }
  };

  // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role = this.state.selectedItem.id;
    axios.ajax({
      url:'/role/user_role_edit',
      data:{
        params:{// 等同于{user_id:data.user_ids,  role_id:data.role_id}
          ...data 
        }
      }
    }).then((res)=>{
      if(res){
        this.setState({
          isUserVisible:false
        });
        this.requestList();
      }
    })
  };

  render() {
    const columns = [
      {
        title: "角色ID",
        dataIndex: "id"
      },
      {
        title: "角色名称",
        dataIndex: "role_name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: Utils.formateDate
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render(status) {
          return status == 1 ? "停用" : "启用";
        }
      },
      {
        title: "授权时间",
        dataIndex: "authorize_time",
        render: Utils.formateDate
      },
      {
        title: "授权人",
        dataIndex: "authorize_user_name"
      }
    ];
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole}>
            创建角色
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10, marginRight: 10 }}
            onClick={this.handlePermission}
          >
            设置权限
          </Button>
          <Button type="primary" onClick={this.handleUserAuth}>
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            dataSource={this.state.list}
            columns={columns}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields(); // 表单重置
            this.setState({
              isRoleVisible: false
            });
          }}
        >
          <RoleForm
            wrappedComponentRef={inst => {
              this.roleForm = inst;
            }}
          />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            });
          }}
        >
          <PermEditForm
            wrappedComponentRef={inst => {
              this.permForm = inst;
            }}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            });
          }}
        >
          <RoleAuthForm
            wrappedComponentRef={inst => {
              this.userAuthForm = inst;
            }}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={(targetKeys)=>{
              this.setState({ targetKeys });
            }}
          />
        </Modal>
      </div>
    );
  }
}

// 子组件一-------角色绑定
class RoleForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator("role_name")(
            <Input type="text" placeholder="请输入角色名称" />
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("state")(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={2}>关闭</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

RoleForm = Form.create({})(RoleForm);

// 子组件二---------设置权限
class PermEditForm extends React.Component {
  onCheck = checkedKeys => {
    // 将当前选中的项传回父组件  PermEditForm
    this.props.patchMenuInfo(checkedKeys);
  };

  // 递归渲染权限列表
  /**
   *
   * @param data:menuConfig.js 导入的权限列表
   */
  renderTreeNodes = data => {
    // 判断当前是否有子节点,如果有子节点children继续遍历,直到没有子节点为止
    return data.map(item => {
      if (item.children) {
        // 判断当前是否有子节点
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode title={item.title} key={item.key} />;
        // 也可写作
        // return <TreeNode {...item}/>
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const { getFieldDecorator } = this.props.form;
    const detail_info = this.props.detailInfo;
    const menu_info = this.props.menuInfo;
    // console.log(detail_info);
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("status", {
            initialValue: detail_info.status + ""
          })(
            <Select>
              <Option value="0">启用</Option>
              <Option value="1">停用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={checkedKeys => {
            // checkedKeys: 当前选中的节点
            this.onCheck(checkedKeys);
          }}
          checkedKeys={menu_info}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}

PermEditForm = Form.create({})(PermEditForm);

// 子组件三---------用户授权
class RoleAuthForm extends React.Component {
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };

  handleChange = (targetKeys)=>{
    this.props.patchUserInfo(targetKeys);
  };
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const detail_info = this.props.detailInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>

        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer
            listStyle={{ width: 250, height: 400 }}
            dataSource={this.props.mockData}
            titles={["待选用户", "已选用户"]}
            showSearch
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption} //过滤选项
            targetKeys={this.props.targetKeys} //目标数据源
            onChange={this.handleChange} //控制目标数据源
            render={item => item.title} //渲染数据
          />
        </FormItem>
      </Form>
    );
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm);
