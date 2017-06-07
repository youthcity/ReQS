import { message } from 'antd';
import { routerRedux } from 'dva/router';

import { getTags } from '../services/tags';
import { addQuestion } from '../services/question';

export default {
  namespace: 'ask',
  state: {
    tags: [],
  },
  reducers: {
    handleTags(state, { payload: tags }) {
      return {
        ...state,
        tags,
      };
    },
  },
  effects: {
    *fetchTags({ payload }, { put, call }) {
      const data = yield call(getTags);
      if (data.success && data.tags) {
        yield put({ type: 'handleTags', payload: data.tags });
      } else {
        message.error('tags 数据获取失败，请稍后重试~~');
      }
    },
    *addQuestion({ payload }, { put, call }) {
      const data = yield call(addQuestion, payload);
      if (data.success) {
        yield put(routerRedux.push(`/question/${data.result._id}`));
        message.success('提问成功~');
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetchTags' });
    },
  },
};
