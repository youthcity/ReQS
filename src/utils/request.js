import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://xxx.xxx.com';

const fetch = (options) => {
  const {
    method = 'get',
    data,
    url,
  } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${!_.isEmpty(data) ? `?${qs.stringify(data)}` : ''}`);
    case 'delete':
      return axios.delete(url, { data });
    case 'head':
      return axios.head(url, data);
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

export default function request(options) {
  return fetch(options).then((response) => {
    console.log(response);
    const { data, statusText, status } = response;
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    };
  }).catch((error) => {
    const { response } = error;
    let message;
    let status;
    if (response) {
      status = response.status;
      const { data, statusText } = response;
      message = data.message || statusText;
    } else {
      status = 600;
      message = 'Network Error';
    }
    return { success: false, status, message };
  });
}
