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

export async function getLogsByUserId(params) {
  return request({
    url: `/user/${params.id}/logs?type=${params.type}`,
    method: 'get',
  });
}

export async function addFollow(id) {
  return request({
    url: `/user/${id}/follow`,
    method: 'get',
    withCredentials: true,
  });
}

export async function addFavorite(questionId) {
  return request({
    url: `/user/${questionId}/favorite`,
    method: 'get',
    withCredentials: true,
  });
}
