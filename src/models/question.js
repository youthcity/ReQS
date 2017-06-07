import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

import { getQuestion, addLike, getAnswerListByTime } from '../services/question';
import { addAnswer, addComment, addThanks, voteAnswer } from '../services/answer';
import { addFavorite, addFollow } from '../services/user';

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
    answers: [],
    editorContent: '',
    isEditorVisible: true,
    currentAnswerListOrder: 'default',
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
      return {
        ...state,
        question: payload,
      };
    },
    fetchAnswersSuccess(state, { payload }) {
      return {
        ...state,
        answers: payload,
      };
    },
    handleClear(state) {
      return {
        ...state,
        editorContent: ' ',
      };
    },
    hideEditor(state) {
      return {
        ...state,
        isEditorVisible: false,
      };
    },
    showEditor(state) {
      return {
        ...state,
        isEditorVisible: true,
      };
    },
    handleChangeCurrentAnswerListOrder(state, { payload }) {
      return {
        ...state,
        currentAnswerListOrder: payload,
      };
    },
    handleChangeAnswers(state, { payload }) {
      return {
        ...state,
        answers: payload,
      };
    },
  },
  effects: {
    *fetchQuestion({ payload }, { put, call }) {
      const data = yield call(getQuestion, payload);
      if (data.success && data.result) {
        yield put({
          type: 'fetchQuestionSuccess',
          payload: data.result.question,
        });
        yield put({
          type: 'fetchAnswersSuccess',
          payload: data.result.answers,
        });
      } else {
        yield put(routerRedux.push('/topic'));
        message.error('服务器君找不到该问题了~~', 2);
      }
    },
    *submitAnswer({ payload }, { put, call, select }) {
      const data = yield call(addAnswer, payload);
      const questionId = yield select(state => state.q.question._id);

      if (data.success) {
        // 刷新状态
        // yield put({ type: 'handleClear' });
        yield put({ type: 'hideEditor' });
        // yield put({
        //   type: 'fetchQuestion',
        //   payload: questionId,
        // });
        yield put({ type: 'showEditor' });
        yield put({ type: 'fetchAnswerListByType',
          payload: {
            id: questionId,
            type: 'time',
          } });
        window.scrollTo(0, 0);
        message.success('添加答案成功!');
      }
    },
    *submitComment({ payload }, { put, call }) {
      const data = yield call(addComment, payload);
      if (data.success) {
        message.success('添加评论成功');
      }
    },
    *addThanks({ payload }, { put, call }) {
      const data = yield call(addThanks, payload);
      if (data.success) {
        message.success('感谢成功');
      }
    },
    *addFavorite({ payload }, { put, call }) {
      const data = yield call(addFavorite, payload);
      if (data.success) {
        message.success('收藏成功');
      }
    },
    *addLike({ payload }, { put, call }) {
      const data = yield call(addLike, payload);
      if (data.success) {
        yield put({ type: 'handleLike' });
        message.success('点赞成功~');
      }
    },
    *addFollow({ payload }, { put, call }) {
      const data = yield call(addFollow, payload);
      if (data.success) {
        message.success('已经添加到你的关注列表');
      }
    },
    *voteAnswer({ payload }, { put, call }) {
      const data = yield call(voteAnswer, payload);
      if (data.success) {
        message.success('投票成功~');
      } else {
        message.error('投票失败');
      }
    },
    *fetchAnswerListByType({ payload }, { put, call }) {
      console.log(payload);
      const data = yield call(getAnswerListByTime, payload);
      if (data.success) {
        yield put({ type: 'handleChangeCurrentAnswerListOrder', payload: payload.type });
        yield put({ type: 'handleChangeAnswers', payload: data.result });
        message.success('列表获取成功');
      } else {
        message.success('获取失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('question') > 0) {
          const match = pathToRegexp('/question/:id').exec(location.pathname);
          if (match) {
            const questionId = match[1];
            dispatch({
              type: 'fetchQuestion',
              payload: questionId,
            });
          } else {
            message.error('老大！没有拿到问题ID呢~~');
          }
        }
      });
    },
  },
};
