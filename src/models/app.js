import { message } from 'antd';
import { routerRedux } from 'dva/router';

import { login, logout, getUserInfo } from '../services/app';

export default {
  namespace: 'app',
  state: {
    user: {},
    isLogin: false,
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
        isLogin: true,
      };
    },
    handleLogout(state) {
      return {
        ...state,
        isLogin: false,
        user: {},
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
          type: 'handleLogout',
        });
        // yield put({
        //   type: 'queryUserSuccess',
        //   payload: {}, //data.user
        // });
      }
    },
    *queryUser({ payload }, { call, put }) {
      const data = yield call(getUserInfo, payload);
      console.log(data);
      if (data.success && data.user) {
        yield put({
          type: 'queryUserSuccess',
          payload: data.user,
        });
      }
    },
    *searchQuestion({ payload }, { call, put }) {
      if (payload) {
        yield put(routerRedux.push(`/search?q=${payload}`));
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryUser' });
    },
  },
};
