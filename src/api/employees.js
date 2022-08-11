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
