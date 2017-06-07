import { message } from 'antd';
import { routerRedux } from 'dva/router';

import { searchQuestion } from '../services/question';


export default {
  namespace: 'search',
  state: {
    questionList: [],
  },
  reducers: {
    fetchListSuccess(state, { payload }) {
      return {
        ...state,
        questionList: payload,
      };
    },
  },
  effects: {
    *fetchList({ payload }, { put, call }) {
      const data = yield call(searchQuestion, payload);
      if (data.success) {
        yield put({ type: 'fetchListSuccess', payload: data.result });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('search') > 0) {
          const { q } = location.query;
          if (!q) {
            dispatch(routerRedux.push('/'));
            message.error('获取信息错误');
          } else {
            dispatch({ type: 'fetchList', payload: q });
          }
        }
      });
    },
  },
};
