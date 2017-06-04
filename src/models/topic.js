import { getQuestionList } from '../services/question';

export default {
  namespace: 'topic',
  state: {
    questionList: [],
    currentType: 'default',
  },
  reducers: {
    fetchListSuccess(state, { payload }) {
      return {
        ...state,
        questionList: payload,
      };
    },
    handleChangeCurrentType(state, { payload }) {
      return {
        ...state,
        currentType: payload,
      };
    },
  },
  effects: {
    *fetchList({ payload }, { put, call }) {
      yield put({
        type: 'handleChangeCurrentType',
        payload,
      });
      const data = yield call(getQuestionList, payload);
      if (data.success) {
        yield put({ type: 'fetchListSuccess', payload: data.result });
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetchList', payload: 'default' });
    },
  },
};
