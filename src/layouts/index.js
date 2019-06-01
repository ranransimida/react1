import { Component } from "react";
import { Layout, Menu, Badge, Icon, Dropdown } from "antd";
import styles from "./index.css";
import Link from "umi/link";
import { connect } from "dva";

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

@connect(
  // 连接购物车状态
  state => ({
    count: state.cart.length,
    cart: state.cart
  })
)
export default class extends Component {
  render() {
    const selectedKeys = [this.props.location.pathname];
    // 构造购物车列表菜单
    const menu = (
      <Menu>
        {this.props.cart.map((item, index) => (
          <Menu.Item key={index}>
            {item.name}X{item.count}
            <span>¥{item.count * item.price}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Layout>
        <Header className={styles.header}>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px", float: "left" }}
            selectedKeys={selectedKeys}
          >
            <img
              className={styles.logo}
              src="https://img.kaikeba.com/logo-new.png"
            />
            <Item key="/">
              <Link to="/">商品</Link>
            </Item>
            <Item key="/users">
              <Link to="/users">用户</Link>
            </Item>
            <Item key="/about">
              <Link to="/about">关于</Link>
            </Item>
          </Menu>
          {/* 购物车状态显示 ,购物车信息放在Dropdown以便展示*/}
          <Dropdown overlay={menu} placement="bottomRight">
            <div style={{ float: "right" }}>
              <Icon type="shopping-cart" style={{ fontSize: 18 }} />
              <span>我的购物车</span>
              <Badge count={this.props.count} offset={[-4, -18]} />
            </div>
          </Dropdown>
        </Header>
        <Content className={styles.content}>
          <div className={styles.box}>{this.props.children}</div>
        </Content>
        <Footer className={styles.footer}>开课吧</Footer>
      </Layout>
    );
  }
}
