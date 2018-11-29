import React from "react";
import Child from "./Child"; //导入子组件

import {Button,Input} from 'antd';//导入antd Ui组件
// import 'antd/dist/antd.css'//导入antd样式

import './index.less'
export default class Life extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		count: 0
		};
	}
	// state = {
	// count:0
	// }
	handleAdd = () => {
		this.setState({
		count: this.state.count + 1
		});
	};
	handleClick() {
		this.setState({
		count: this.state.count + 1
		});
	}
	render() {

	return (
		<div className="content">
			<p>React生命周期介绍</p>
			<Input></Input>
			<Button onClick={this.handleAdd} type="primary">AntD 点击一下</Button>
			<button onClick={this.handleAdd}>点击一下</button>
			<button onClick={this.handleClick.bind(this)}>点击一下</button>
			<p>{this.state.count}</p>
			{/* <Child name="Jack"></Child> */}
			
			
			<Child name={this.state.count} />
			
		</div>
		);
	}
}
