搭建React开发环境之前的准备工作。


	1、必须安装nodejs      注意：安装nodejs稳定版本


	2、安装cnpm用cnpm替代npm
		地址：http://npm.taobao.org/
		安装cnpm:
			npm install -g cnpm --registry=https://registry.npm.taobao.org
	3、用yarn替代npm	
	
		yarn的安装：
			第一种方法：参考官方文档https://yarn.bootcss.com/


			第二种方法：cnpm install -g yarn  或者 npm install -g yarn

搭建React开发环境的第一种方法（老-现在推荐）：

	https://reactjs.org/docs/create-a-new-react-app.html
	
	1、必须要安装nodejs     注意：安装nodejs稳定版本      教程中的nodejs版本:v8.11.2            教程中的npm版本:v5.6.0
	
	2.安装脚手架工具   （单文件组件项目生成工具）   只需要安装一次


		npm install -g create-react-app   /  cnpm install -g create-react-app
	
	3.创建项目   （可能创建多次）


		找到项目要创建的目录：
		create-react-app reactdemo
	
	4.cd  到项目里面	
		cd  reactdemo

## 打包项目


		npm start             yarn start运行项目


		npm run build         yarn build 生成项目

## 
搭建React的开发环境的第二种方法（新-未来推荐）：

	https://reactjs.org/docs/create-a-new-react-app.html
	
	1、必须要安装nodejs     注意：安装nodejs稳定版本      教程中的nodejs版本:v8.11.2            教程中的npm版本:v5.6.0
	
	2.安装脚手架工具并创建项目


		找到项目要创建的目录执行：


		npx create-react-app reactdemo
	
	4.cd  到项目里面	
		cd  reactdemo


		npm start  运行项目（调试）


		npm run build 生成项目（发布）

npx介绍：

	npm v5.2.0引入的一条命令（npx），引入这个命令的目的是为了提升开发者使用包内提供的命令行工具的体验。

详情：
	http://www.phonegap100.com/thread-4910-1-1.html

	npx create-react-app reactdemo这条命令会临时安装 create-react-app 包，命令完成后create-react-app 会删掉，不会出现在 global 中。下次再执行，还是会重新临时安装。
	npx 会帮你执行依赖包里的二进制文件。
	
	再比如 npx http-server 可以一句话帮你开启一个静态服务器

manifest.json 文件简介：

	https://lavas.baidu.com/mip/doc/engage-retain-users/add-to-home-screen/introduction
	
	允许将站点添加至主屏幕，是 PWA 提供的一项重要功能，当前 manifest.json 的标准仍属于草案阶段，Chrome 和 Firefox 已经实现了这个功能，微软正努力在 Edge 浏览器上实现，Apple 目前仍在考虑中

super关键字：


	参考：http://www.phonegap100.com/thread-4911-1-1.html


	Es6中的super可以用在类的继承中，super关键字，它指代父类的实例（即父类的this对象）。子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
	
	class Person {
 	 	constructor (name) {
  	  		this.name = name;
  		}
	}

	class Student extends Person {
  		constructor (name, age) {
    			super(); // 用在构造函数中，必须在使用this之前调用
    			this.age = age;
 		 }
	}

只有一个理由需要传递props作为super()的参数，那就是你需要在构造函数内使用this.props那官方提供学习的例子中都是写成super(props)，所以说写成super(props)是完全没问题的，也建议就直接这样写。

第一种方法：

  	run(){

        	alert(this.state.name)
  	}
  	<button onClick={this.run.bind(this)}>按钮</button>



第二种方法：


	构造函数中改变
	
	this.run = this.run.bind(this);


 	run(){

        	alert(this.state.name)
 	 }
 	<button onClick={this.run>按钮</button>



第三种方法：


	 run=()=> {
			alert(this.state.name)
 	 }

	<button onClick={this.run>按钮</button>

React中的组件: 解决html 标签构建应用的不足。


使用组件的好处：把公共的功能单独抽离成一个文件作为一个组件，哪里里使用哪里引入。



父子组件：组件的相互调用中，我们把调用者称为父组件，被调用者称为子组件



父子组件传值：


    父组件给子组件传值 
    
    	    1.在调用子组件的时候定义一个属性  <Header msg='首页'></Header>
    
    	    2.子组件里面 this.props.msg          


    说明：父组件不仅可以给子组件传值，还可以给子组件传方法,以及把整个父组件传给子组件。



    父组件主动获取子组件的数据
    
        1、调用子组件的时候指定ref的值   <Header ref='header'></Header>      
        
        2、通过this.refs.header  获取整个子组件实例
1.antd官网：

	https://ant.design/docs/react/introduce-cn



2、React中使用Antd

	1、安装antd   npm install antd --save    /   yarn add antd     /  cnpm install antd --save


	2、在您的react项目的css文件中引入 Antd的css
	
		@import '~antd/dist/antd.css';


	3、看文档使用：
	
		如使用Button： 
	
			1、在对应的组件中引入Antd        import { Button } from 'antd';


			2、<Button type="primary">Primary</Button>






3、React中使用Antd高级配置，按需引入css样式


	我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。


	1、安装antd         npm install antd --save


	2、安装（react-app-rewired）一个对 create-react-app 进行自定义配置的社区解决方案


	   yarn add react-app-rewired    /  cnpm install  react-app-rewired --save


	3、修改 package.json
	
	react-scripts 需改为react-app-rewired


  	"scripts": {
    		"start": "react-app-rewired start",
    		"build": "react-app-rewired build",
    		"test": "react-app-rewired test --env=jsdom",
    		"eject": "react-app-rewired eject"
 	 }


​	

	4、安装babel-plugin-import   babel-plugin-import是一个用于按需加载组件代码和样式的 babel 插件
	
		yarn add babel-plugin-import   /  cnpm install babel-plugin-import --save


	5、在项目根目录创建一个 config-overrides.js 配置文件


	const { injectBabelPlugin } = require('react-app-rewired');

  	module.exports = function override(config, env) {
   	 config = injectBabelPlugin(
     		   ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
        	   config,
  	  );
   	 return config;
 	 };



	7、然后移除前面在 src/App.css 里全量添加的 @import '~antd/dist/antd.css'; 直接引入组件使用就会有对应的css


​		

		import { Button } from 'antd';


		<Button type="primary">Primary</Button>



