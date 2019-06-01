import React, { Component } from "react";
import styles from "./login.css";
import { Login } from "ant-design-pro";
import { connect } from "dva";

const { UserName, Password, Submit } = Login;

@connect()
export default class extends Component {
  //let from = props.location.state.from || "/"; // 重定向地址
  onSubmit = (err, values) => {
    console.log(err, values);
    if (!err) {
      this.props.dispatch({ type: "user/login", payload: values });
    }
  };
  render() {
    return (
      <div className={styles.loginForm}>
        <img
          className={styles.logo}
          src="https://img.kaikeba.com/logo-new.png"
        />
        <Login onSubmit={this.onSubmit}>
          <UserName
            name="username"
            placeholder="kaikeba"
            rules={[{ required: true, message: "请输入用户名" }]}
          />
          <Password
            name="password"
            placeholder="123"
            rules={[{ required: true, message: "请输入密码" }]}
          />
          <Submit>提交</Submit>
        </Login>
      </div>
    );
  }
}
