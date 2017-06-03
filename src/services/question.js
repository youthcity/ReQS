import { request } from '../utils';

export async function addQuestion(params) {
  return request({
    url: '/question',
    method: 'post',
    data: params,
    withCredentials: true,
  });
}
