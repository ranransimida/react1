import axios from "axios";

const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {
  token: "",
  role: "",
  username: "",
  balance: 0
};

function loginApi(info) {
  return axios.post("/api/login", info).then(res => res.data.data);
}

export default {
  namespaced: "user",
  state: userinfo,
  effects: {
    *login(action, { call, put }) {
        try {
            const userinfo = yield call(loginApi, action.payload);
            alert("登陆成功");
            localStorage.setItem("userinfo", JSON.stringify(userinfo));
            yield put({type: "init", payload: userinfo});
        } catch (error) {
            console.log(error)
        }
    }
  },
  reducers: {
    init(state, action){
        return action.payload;
    }
  }
};
