import { request } from '../utils';

export async function edit(params) {
  return request({
    url: `/users/${params.id}`,
    method: 'patch',
    data: params.data,
    withCredentials: true,
  });
}

export async function incPv(id) {
  return request({
    url: `/user/pv/${id}`,
    method: 'get',
  });
}

export async function getUserInfoById(id) {
  return request({
    url: `/user/${id}/userInfo`,
    method: 'get',
  });
}
