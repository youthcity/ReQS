import { message } from 'antd';
import { login, logout, getUserInfo } from '../services/app';

export default {
  namespace: 'app',
  state: {
    user: {},
    loginModalVisible: false,
    confirmLoading: false,
  },
  reducers: {
    showLoginModal(state) {
      return {
        ...state,
        loginModalVisible: true,
      };
    },
    hideLoginModal(state) {
      return {
        ...state,
        loginModalVisible: false,
      };
    },
    showConfirmLoading(state) {
      return {
        ...state,
        confirmLoading: true,
      };
    },
    hideConfirmLoading(state) {
      return {
        ...state,
        confirmLoading: false,
      };
    },
    queryUserSuccess(state, { payload: user }) {
      return {
        ...state,
        user,
      };
    },
  },
  effects: {
    *login({
      payload,
    }, { put, call }) {
      yield put({ type: 'showConfirmLoading' });
      const data = yield call(login, payload);
      yield put({ type: 'hideConfirmLoading' });

      if (data.success && data.user) {
        yield put({
          type: 'queryUserSuccess',
          payload: data.user,
        });
        yield put({
          type: 'hideLoginModal',
        });
      } else {
        message.error('登录失败，请稍后重试');
      }
    },
    *logout({
      payload,
    }, { put, call }) {
      const data = yield call(logout, payload);
      if (data.success) {
        yield put({
          type: 'queryUserSuccess',
          payload: {}, //data.user
        });
      }
    },
    *queryUser({ payload }, { call, put }) {
      const data = yield call(getUserInfo, payload);
      if (data.success && data.user) {
        yield put({
          type: 'queryUserSuccess',
          payload: data.user,
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryUser' });
    },
  },
};
