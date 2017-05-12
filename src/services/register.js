import { request } from '../utils';

export async function signup(data) {
  return request({
    url: '/api/user/signup',
    method: 'post',
    data,
  });
}
