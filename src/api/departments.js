import request from '@/utils/request'
/**
 * 获取组织架构
 * @returns promise
 */
export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}
/**
 *删除部门
 * @param {*} id 要删除部门的id
 * @returns promise
 */
export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}
