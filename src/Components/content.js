import React, { Component } from 'react'
import { Button, Table } from 'antd'

class Content extends Component {
  constructor(params) {
    super(params)
    this.state = {}
    console.log(this.props)
  }

  componentDidMount() {
    const { getUserList } = this.props
    getUserList({
      page: 1,
      pageSize: 10
    })
  }

  render() {
    const { lists } = this.props
    return (
      <div>
        <Button>按钮</Button>
        <ul>
          {lists.map((value, index) => (
            <li key={index}>{value.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Content
