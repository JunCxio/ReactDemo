import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import './index.less'

const FormItem = Form.Item

class Login extends Component {
  constructor(params) {
    super(params)
    this.state = {}
  }

  componentDidMount() {
    const { getCode } = this.props
    getCode()
  }

  /**
   * 登录提交
   */
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { login, code, getCode } = this.props
        if (values.code == code) {
          login({ ...values }, this.props)
        } else {
          getCode()
          message.error('验证码错误!')
        }
      }
    })
  }

  /**
   * 变更验证码
   */
  changeCode = () => {
    const { getCode } = this.props
    getCode()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { imgUrl } = this.props
    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } }
    }
    const codeLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } }
    }
    return (
      <section className="DEMO-LOGIN">
        <div className="wrap">
          <Form onSubmit={this.handleSubmit}>
            <FormItem wrapperCol={{ sm: { span: 16, offset: 9 } }}>
              <h1>用户登录</h1>
            </FormItem>
            <FormItem {...formItemLayout} label="账号:">
              {getFieldDecorator('accountNum', {
                rules: [{ required: true, message: '请输入账号!' }]
              })(<Input placeholder="账号" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="密码:">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(<Input type="password" placeholder="密码" />)}
            </FormItem>

            <FormItem {...codeLayout} label="验证码:">
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码!' }]
              })(
                <div className="code">
                  <Input placeholder="验证码" />{' '}
                  <img src={imgUrl} alt="验证码" onClick={this.changeCode} />
                </div>
              )}
            </FormItem>

            <FormItem wrapperCol={{ sm: { span: 16, offset: 9 } }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </FormItem>

            <FormItem wrapperCol={{ sm: { span: 16, offset: 9 } }}>
              <a href="/register">没有账号,去注册!</a>
            </FormItem>
          </Form>
        </div>
      </section>
    )
  }
}

const LoginInterface = Form.create()(Login)

export default LoginInterface
