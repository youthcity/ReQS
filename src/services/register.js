import { request } from '../utils';

export async function signup(data) {
  return request({
    url: '/user/signup',
    method: 'post',
    data,
  });
}
