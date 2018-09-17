import moment from 'moment'

export const userFilter = data => {
  return data
    ? data.map(value => {
        return {
          id: value.id,
          name: value.name,
          sex: value.sex,
          area: value.area,
          mobile: value.mobile,
          desc: value.desc,
          modifyTime: moment(value.modifyTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    : []
}
