import { request } from '../utils';

export async function login(params) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: params,
  });
}

export async function logout(params) {
  return request({
    url: '/api/user/logout',
    method: 'get',
    data: params,
  });
}

export async function getUserInfo(params) {
  return request({
    url: '/api/userInfo',
    method: 'get',
    data: params,
  });
}
