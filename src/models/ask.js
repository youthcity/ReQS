import { message } from 'antd';

import { getTags } from '../services/tags';
import { addQuestion } from '../services/question';

export default {
  namespace: 'ask',
  state: {
    content: '<h4>在这里输入你的答案</h4>',
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
