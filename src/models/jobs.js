import { message } from 'antd';

import { getQuestionList } from '../services/question';

export default {
  namespace: 'jobs',
  state: {
    questionList: [],
    topic: '招聘',
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
        if (location.pathname.indexOf('jobs') > 0) {
          dispatch({ type: 'fetchList', payload: 'jobs' });
        }
      });
    },
  },
};
