import request from '@/utils/request';

const auth = '/auth';

/**
 * 登录
 * @param {*} account
 * @param {*} password
 */
export function loginByUsername(account, password) {
  const data = {
    account,
    password
  };
  return request({
    url: 'auth/jwt/admin/token',
    method: 'post',
    data
  });
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

/**
 * 登录用户信息
 * @param {*} token
 */
export function getUserInfo(token) {
  return request({
    url: auth + '/protected/user/getLoginUser',
    method: 'get',
    params: {
      token
    }
  })
}
// 菜单
export function getAuthorizedItem() {
  return request({
    url: ''
  })
}
// 按钮权限
export function getAuthorizedBtnAuthCode() {
  return request({
    url: ''
  })
}