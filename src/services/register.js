import { request } from '../utils';

export async function signup(data) {
  return request({
    url: '/signup',
    method: 'post',
    data,
  });
}
