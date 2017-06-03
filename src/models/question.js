import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

import { getQuestion } from '../services/question';

const question = {
  author: { _id: 11111, username: 'youthcity' },
  title: '[北京][2017年6月18日] Rails Girls 复活啦 2017 北京活动报名 | 少女们一天学编程',
  content: '',
  answer: [1, 2, 3, 45, 6],
  likes: [1, 2, 3, 4],
  excellent: 1, // 0 false 1 true
  pv: 4,
  tags: ['react', 'tt', 'js'],
  creationDate: '2017-05-31T08:52:54.908Z',
  updatedDate: '2017-06-31T08:52:54.908Z',
};

export default {
  namespace: 'q',
  state: {
    isLike: false,
    question,
  },
  reducers: {
    handleLike(state) {
      return {
        ...state,
        isLike: true,
      };
    },
    handleHate(state) {
      return {
        ...state,
        isLike: false,
      };
    },
    fetchQuestionSuccess(state, { payload }) {
      console.log('===PL====', payload);
      return {
        ...state,
        question: payload,
      };
    },
  },
  effects: {
    *fetchQuestion({ payload }, { put, call }) {
      const data = yield call(getQuestion, payload);
      if (data.success && data.result) {
        yield put({
          type: 'fetchQuestionSuccess',
          payload: data.result,
        });
      } else {
        yield put(routerRedux.push('/topic'));
        message.error('服务器君找不到该问题了~~', 2);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('question') > 0) {
          const match = pathToRegexp('/question/:id').exec(location.pathname);
          if (match) {
            const userId = match[1];
            dispatch({
              type: 'fetchQuestion',
              payload: userId,
            });
          } else {
            message.error('老大！没有拿到问题ID呢~~');
          }
        }
      });
    },
  },
};
