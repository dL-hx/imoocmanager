import React from "react";
import { HashRouter as Router, Route } from "react-router-dom"; 
import Info from "./info";
import Topic from "./../router1/Topic";
import About from "./../router1/About";
import Main from "./Main";
import Home from "./Home"; 

export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Route
            path="/main"
            render={() => 
              <Main>
                {/* <div>this is a subchild element</div> */}
                <Route path="/main/:value" component={Info} />
              </Main>
            }
          />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topic} />

        </Home>
      </Router>
    );
  }
}
