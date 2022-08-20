import request from '@/utils/request'
/**
 * 获取角色列表
 * @param {*} params
 * @returns
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 *添加角色
 * @param {*} data
 * @returns
 */
export function addRoleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 通过ID 删除
export function removeRoleApi(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

// 通过角色ID，获取默认权限
export function getRolesInfo(id) {
  return request({
    url: '/sys/role/' + id
  })
}

// 给角色分配权限--确定按钮
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
