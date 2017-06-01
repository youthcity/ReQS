import { request } from '../utils';

export async function edit(data) {
  return request({
    url: '/users',
    method: 'patch',
    data,
  });
}
