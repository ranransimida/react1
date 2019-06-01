import axios from "axios";
// api
function getGoods() {
  return axios.get("/api/goods");
}

export default {
  namespace: "goods",
  state: {
    courses: {},
    tags: []
  },
  effects: {
    *getList(action, { call, put }) {
      const res = yield call(getGoods);
      yield put({ type: "initGoods", payload: res.data.data });
    }
  },
  reducers: {
    initGoods(state, { payload }) {
      const { tags, data: courses } = payload;
      return {...state, tags, courses};
    }
  }
};
