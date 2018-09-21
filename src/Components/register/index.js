import React, { Component } from 'react'
import { Form, Input, Button, Upload, Icon, message } from 'antd'
import './index.less'
import request from '../../utils/request'
import { api } from '../../constants/API'

const FormItem = Form.Item

/**
 * Base64
 */
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

/**
 * 上传文件之前的钩子
 * @param file 上传的文件
 */
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('只允许JPG格式的文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('文件大小过大!')
  }
  return isJPG && isLt2M
}

class Register extends Component {
  constructor(params) {
    super(params)
    this.state = {
      imageUrl: '',
      confirmDirty: false
    }
  }

  /**
   * 注册
   */
  registerUser = dataObj => {
    request({
      url: api.registerUser,
      method: 'post',
      data: {
        ...dataObj
      }
    }).then(res => {
      if (res.respCode == 10000000) {
        message.success(res.repMessage)
        const { history } = this.props
        history.push('/')
      } else {
        message.success(res.repMessage)
      }
    })
  }

  /**
   * 上传文件改变时的状态
   */
  handleChange = info => {
    getBase64(info.file.originFileObj, imageUrl =>
      this.setState({
        imageUrl
      })
    )
  }

  /**
   * Submit
   */
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.registerUser({
          ...values,
          avatar: this.state.imageUrl
        })
      }
    })
  }

  /**
   *检验密码是否相同
   */
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const uploadButton = (
      <div>
        <Icon type={'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl
    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } }
    }
    return (
      <section className="DEMO-REGISTER">
        <div className="wrap">
          <Form onSubmit={this.handleSubmit}>
            <FormItem wrapperCol={{ sm: { span: 18, offset: 10 } }}>
              <h1>用户注册</h1>
            </FormItem>
            <FormItem>
              {getFieldDecorator('avatar', {})(
                <Upload
                  name="avatar"
                  action="http://192.168.9.155:3022/api/upload"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户名:">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(<Input placeholder="用户名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="账号:">
              {getFieldDecorator('accountNum', {
                rules: [{ required: true, message: '请输入账号!' }]
              })(<Input placeholder="账号" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="密码:">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!'
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input type="password" placeholder="密码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="确认密码:">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请再次输入密码!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input
                  type="password"
                  placeholder="请再次输入密码"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem>

            <FormItem wrapperCol={{ sm: { span: 16, offset: 10 } }}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </FormItem>

            <FormItem wrapperCol={{ sm: { span: 16, offset: 10 } }}>
              <a href="/">已有账号,去登录!</a>
            </FormItem>
          </Form>
        </div>
      </section>
    )
  }
}

const RegisterInterface = Form.create()(Register)

export default RegisterInterface
