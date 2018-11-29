import React from "react";
export default class Child extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	componentWillMount() {
		console.log("will mount");
	}
	
	componentDidMount() {
		console.log("did mount");
	}
	
	componentWillReceiveProps(newProps) {
		//接收端的属性
		//接收从其他组件传递的属性(拦截传递过来的值)
		console.log("will props" + newProps.name);
	}
	
	shouldComponentUpdate() {
		//组件更新的方法调用setState就会更新该方法
		console.log("should update");
		return true; //默认return true ,return false 后面不会走了
	}
	
	//组件更新之前的方法
	componentWillUpdate() {
		console.log("will update");
	}
	
	//组件更新之后的方法
	componentDidUpdate() {
		console.log("did update");
	}
	render() {
		return (
			<div>
				<p>这里是子组件,测试子组件的生命周期</p>
				<p>{this.props.name}</p>
			</div>
		);
	}
}
