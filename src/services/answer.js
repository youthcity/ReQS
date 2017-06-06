import { request } from '../utils';

export async function addAnswer(params) {
  return request({
    url: '/answer',
    method: 'post',
    data: params,
    withCredentials: true,
  });
}

export async function addComment(params) {
  return request({
    url: `/answer/${params.id}/comment`,
    method: 'post',
    data: { content: params.content },
    withCredentials: true,
  });
}

export async function addThanks(id) {
  return request({
    url: `/answer/${id}/thanks`,
    method: 'get',
    withCredentials: true,
  });
}

export async function voteAnswer(params) {
  return request({
    url: `/answer/${params.id}/voteAnswer?type=${params.type}`,
    method: 'get',
    withCredentials: true,
  });
}
