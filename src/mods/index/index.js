import React from 'react';
import ReactDOM from 'react-dom';
import framework from '../../components/framework'
import isomorphicFetch from 'isomorphic-fetch';
import { Form, Icon, Input, Button, Checkbox,message,Modal } from 'antd';
import "./index.scss";
import { getFetch, postFetch } from '../../components/cfetch'
import urlFile from '../../components/cfetch/api'
const FormItem = Form.Item;

class App extends React.Component {
    constructor (props){
        super(props);
        var me = this;
        me.state = {
            btnText:"登录"

        };
        me.handleSubmit = me.handleSubmit.bind(me);
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        var me = this;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const res = await postFetch(urlFile.login, {
                    j_username: values.userName,
                    j_password: values.password
                })
                if(res.success){
                    me.setState({
                       btnText:"正在登录..."
                   });
                    var expires = new Date();
                    expires.setTime(expires.getTime() + 30 * 60 * 1000);
                    document.cookie="JSESSIONID=" + res.session + ";expires=" + expires.toGMTString();
                    document.cookie="userName="+values.userName + ";expires=" + expires.toGMTString();
                    setTimeout(()=>{
                        window.location.href = '/marketing/effecttracking.html';
                    },2000)

                }else {
                    me.setState({
                        btnText:"登录"
                    });
                    Modal.info({
                        title: '提示',
                        content: (
                            <div>
                                {res.message}
                            </div>
                        ),
                        onOk() {},
                    });
                }
            }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
      return(
        <div className="main">
          <Form onSubmit={this.handleSubmit} className="login-form login-main">
              <h2>欢迎登录</h2>
              <FormItem>
                  {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )}
              </FormItem>
              <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button" >
                      {this.state.btnText}
                  </Button>
              </FormItem>
          </Form>
        </div>

      )
    }
}
 const Apps = Form.create()(App);
ReactDOM.render(<Apps />, document.getElementById('J_wrapBody'));