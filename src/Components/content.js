import React, { Component } from 'react'
import { Table, Popconfirm } from 'antd'
import { userFilter } from './common/commonMethod'

class Content extends Component {
  constructor(params) {
    super(params)
    this.state = {
      dataObj: {
        page: 1,
        pageSize: 10
      },
      pageSize: 10,
      page: 1
    }
  }

  componentDidMount() {
    console.log(this.props)
    const { getUserList } = this.props
    // getUserList({
    //   ...this.state.dataObj
    // })
  }

  /**
   * 切换页码
   * @param page 页面
   */
  pageChange = page => {
    const { getUserList } = this.props
    this.setState(
      {
        page,
        dataObj: {
          ...this.state.dataObj,
          page
        }
      },
      () => {
        getUserList({
          ...this.state.dataObj
        })
      }
    )
  }

  /**
   * 改变每页显示条数
   * @param pageSize 条数
   */
  sizeChange = (current, pageSize) => {
    const { getUserList } = this.props
    this.setState(
      {
        pageSize,
        page: 1,
        dataObj: {
          ...this.state.dataObj,
          pageSize,
          page: 1
        }
      },
      () => {
        getUserList({ ...this.state.dataObj })
      }
    )
  }

  /**
   * 确定删除
   */
  deleteUser = id => {
    const { deleteUser, getUserList } = this.props
    deleteUser(id).then(res => {
      getUserList({ ...this.state.dataObj })
    })
  }

  render() {
    const { lists, total } = this.props

    const columns = [
      {
        title: '序号',
        render: (text, record, index) => (
          <span>{(this.state.page - 1) * this.state.pageSize + index + 1}</span>
        ),
        key: 'number',
        align: 'center'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        align: 'center'
      },
      {
        title: '住址',
        dataIndex: 'area',
        key: 'area',
        align: 'center'
      },
      {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile',
        align: 'center'
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        align: 'center'
      },
      {
        title: '创建时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Popconfirm
            title="是否删除该用户?"
            onConfirm={this.deleteUser.bind(this, record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        ),
        align: 'center'
      }
    ]

    /**
     * 配置分页
     */
    const pagination = {
      current: this.state.page,
      total: total,
      pageSize: this.state.pageSize,
      showTotal: total => `共${total}条`,
      onChange: this.pageChange,
      showSizeChanger: true,
      onShowSizeChange: this.sizeChange,
      pageSizeOptions: ['10', '20', '50'],
      showQuickJumper: true
    }

    return (
      <div>
        <Table
          columns={columns}
          dataSource={userFilter(lists)}
          bordered
          pagination={pagination}
        />
      </div>
    )
  }
}

export default Content
