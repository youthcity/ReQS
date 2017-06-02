
export default {
  namespace: 'q',
  state: {
    isLike: false,

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
  },
  effects: {},
  subscriptions: {},
};
