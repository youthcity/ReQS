import { request } from '../utils';

export async function login(params) {
  return request({
    url: '/user/signin',
    method: 'post',
    data: params,
  });
}

export async function logout(params) {
  return request({
    url: '/user/logout',
    method: 'get',
    data: params,
  });
}

export async function getUserInfo(params) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    data: params,
    withCredentials: true,
  });
}
