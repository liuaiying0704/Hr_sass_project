import request from '@/utils/request'
/**
 * 登陆情求
 * @param {Object} data password mobilep
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
