import { message } from 'antd';
import { routerRedux } from 'dva/router';

import { getQuestionList } from '../services/question';

export default {
  namespace: 'news',
  state: {
    questionList: [],
    title: 'ReQS热门头条',
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
      const data = yield call(getQuestionList, payload);
      if (data.success) {
        yield put({ type: 'fetchListSuccess', payload: data.result });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('news') > 0) {
          dispatch({ type: 'fetchList', payload: 'excellent' });
        }
      });
    },
  },
};
