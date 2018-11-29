import React from 'react'
import {HashRouter, Route, Link, Switch} from "react-router-dom";//引入路由
import About from "./About";
import Topic from "./Topic";
import Main from "./Main";

export default class Home extends React.Component {//默认输出 对象{}
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                    <hr/>
                    {/*<Route exact={true} path='/' component={Main}></Route>*/}
                    <Switch>
                        <Route exact={true} path='/' component={Main}/>
                        <Route path='/about' component={About}/>
                        <Route path='/topics' component={Topic}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}
