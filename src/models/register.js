import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { signup } from '../services/register';

export default {
  namespace: 'register',
  state: {
    registerLoading: false,
  },
  reducers: {
    showRegisterLoading(state) {
      return {
        ...state,
        registerLoading: true,
      };
    },
    hideRegisterLoading(state) {
      return {
        ...state,
        registerLoading: false,
      };
    },
  },
  effects: {
    *signin({ payload }, { put, call }) {
      yield put({ type: 'showRegisterLoading' });
      const data = yield call(signup, payload);
      if (data.success) {
        yield put({ type: 'hideRegisterLoading' });
        yield put(routerRedux.push('/'));
        notification.success({
          message: '恭喜你，注册成功~',
          description: '欢迎来到ReQS，请登录后体验精彩世界  (*´∀`)~♥',
          duration: 2.8,
        });
      } else {
        throw new Error('注册失败，请稍后重试~');
      }
    },
  },
  subscriptions: {},
};
