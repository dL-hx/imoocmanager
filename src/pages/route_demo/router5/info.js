import React from 'react'
/* 
{this.props.match.params.xxx}
xxx:是:后面的value      <Route path="/main/:value" component={Info} />
此处写作: {this.props.match.params.value}
*/
export default class Info extends React.Component {
    render() {
        return (
            <div>
                这里是测试动态路由功能
                动态路由的值是: {this.props.match.params.value}
            </div>
        );
    }
}
