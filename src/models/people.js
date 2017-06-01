import { edit } from '../services/user';


export default {
  namespace: 'people',
  state: {
    editModalVisible: false,
    confirmLoading: false,
  },
  reducers: {
    showEditModal(state) {
      return {
        ...state,
        editModalVisible: true,
      };
    },
    hideEditModal(state) {
      return {
        ...state,
        editModalVisible: false,
      };
    },
    showEditLoading(state) {
      return {
        ...state,
        confirmLoading: true,
      };
    },
    hideEditLoading(state) {
      return {
        ...state,
        confirmLoading: false,
      };
    },
  },
  effects: {
    *editUser({ payload }, { call, put }) {
      yield put({ type: 'showEditLoading' });
      const data = yield call(edit, payload);
      if (data.success) {
        yield put({ type: 'hideEditLoading' });
      }
    },
  },
  subscriptions: {},
};
