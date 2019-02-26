import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Life from "./pages/demo/Life";
import Admin from "./admin";
import Router from "./router"; //全局引入Router文件
import { Provider } from "react-redux"; // 添加<Provider />项目根组件
import configureStore from "./redux/store/configureStore";

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

// import Home from './pages/route_demo/router1/Home';
// ReactDOM.render(<Home />, document.getElementById('root'));

// import Router from './pages/route_demo/router2/router';
// ReactDOM.render(<Router />, document.getElementById('root'));

// import Router from './pages/route_demo/router3/router';
// ReactDOM.render(<Router />, document.getElementById('root'));

// import Router from './pages/route_demo/router4/router';
// ReactDOM.render(<Router />, document.getElementById('root'));

// import Router from './pages/route_demo/router5/router';
// ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
