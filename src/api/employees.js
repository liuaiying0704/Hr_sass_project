import request from '@/utils/request'
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取详细的员工数据
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

//
/**
 * 批量导入员工
 * @param {*} data  员工数组
 * @returns
 */
export function importEmployees(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
