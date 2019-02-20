import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notice from "./pages/ui/notice";
import Messages from "./pages/ui/messages";
import Tabs1 from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousel";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import BasicTable from "./pages/table/basicTable";
import HighTable from "./pages/table/highTable";
import RichText from "./pages/rich";
import City from "./pages/city";
import Order from "./pages/order";
import User from "./pages/user";
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Permission from './pages/permission'
import NoMatch from "./pages/nomatch";
import Common from "./common";
import OrderDetail from "./pages/order/detail";

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login}/>
          <Route
            path="/admin"
            render={() => (
              <Admin>
                <Switch>
                  <Route path="/admin/home" component={Home}/>
                  <Route path="/admin/ui/buttons" component={Buttons}/>
                  <Route path="/admin/ui/modals" component={Modals}/>
                  <Route path="/admin/ui/loadings" component={Loadings}/>
                  <Route path="/admin/ui/notification" component={Notice}/>
                  <Route path="/admin/ui/messages" component={Messages}/>
                  <Route path="/admin/ui/tabs" component={Tabs1}/>
                  <Route path="/admin/ui/gallery" component={Gallery}/>
                  <Route path="/admin/ui/carousel" component={Carousels}/>
                  <Route path="/admin/form/login" component={FormLogin}/>
                  <Route path="/admin/form/reg" component={FormRegister}/>
                  <Route path="/admin/table/basic" component={BasicTable}/>
                  <Route path="/admin/table/high" component={HighTable}/>
                  <Route path="/admin/rich" component={RichText}/>
                  <Route path="/admin/city" component={City}/>
                  <Route path="/admin/order" component={Order}/>
                  <Route path="/admin/user" component={User}/>
                  <Route path="/admin/bikeMap" component={BikeMap}/>
                  <Route path="/admin/charts/bar" component={Bar}/>
                  <Route path="/admin/charts/pie" component={Pie}/>
                  <Route path="/admin/charts/line" component={Line}/>
                  <Route path="/admin/permission" component={Permission}/>
                  <Route component={NoMatch}/>
                </Switch>
              </Admin>
            )}
          />

          <Route path="/common" render={() => {
            return <Common>
              <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
            </Common>;
          }}
          />
          <Route path="/order/detail" component={Login}/>
        </App>
      </HashRouter>
    );
  }
}
