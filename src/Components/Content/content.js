import React, { Component } from 'react'
import { List, Avatar, Input, Button } from 'antd'
import moment from 'moment'
import './content.less'
import baozi from '../../assets/img/baozi.jpg'

const { TextArea } = Input

class Content extends Component {
  constructor(params) {
    super(params)
    this.state = {
      comment: ''
    }
  }

  componentDidMount() {
    const { getCommentList } = this.props
    getCommentList(1)
  }

  /**
   * 发表评论
   * @param id 用户ID
   * @param comment 评论
   */
  comment = () => {
    const { id, avatar, userName } = JSON.parse(sessionStorage.getItem('user'))
    const { comment, getCommentList } = this.props
    comment({ id, comment: this.state.comment, avatar, userName }).then(res => {
      getCommentList(1)
      if (res) this.setState({ comment: '' })
    })
  }

  /**
   * 输入框
   */
  leaveMsg = e => {
    this.setState({
      comment: e.target.value
    })
  }

  render() {
    const { avatar, userName } = JSON.parse(sessionStorage.getItem('user'))
    const { lists, total, getCommentList } = this.props
    return (
      <section className="DEMO-CONTENT">
        <div className="messageList">
          <h1>留言列表:</h1>
          <List
            itemLayout="horizontal"
            dataSource={lists}
            pagination={{
              onChange: page => {
                getCommentList(page)
              },
              pageSize: 5,
              total: parseInt(total)
            }}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <div>
                      <b>{item.userName}</b>
                      <span style={{ marginLeft: 14 }}>
                        {moment(item.commentTime).format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                  description={item.comment}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="comment">
          <h1>评论:</h1>
          <div className="box">
            <div className="avatar">
              <img src={avatar ? avatar : baozi} alt="头像" />
              <span className="userName">{userName}</span>
              <div className="btn">
                <Button type="primary" onClick={this.comment}>
                  发表
                </Button>
              </div>
            </div>
            <div className="textArea">
              <TextArea
                placeholder="请输入您的评论!"
                rows={10}
                value={this.state.comment}
                onChange={this.leaveMsg}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Content
