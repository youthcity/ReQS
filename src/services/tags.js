import { request } from '../utils';

export async function getTags(data) {
  return request({
    url: '/tags',
    method: 'get',
    data,
  });
}
