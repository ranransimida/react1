import React, { Component } from "react";
import { Card, Row, Col, Skeleton, Icon } from "antd";
import { TagSelect } from "ant-design-pro";
import { connect } from "dva";

@connect(
  state => ({
    courses: state.goods.courses,
    tags: state.goods.tags
    // loading: state.loading
  }),
  {
    addCart: item => ({
      type: "cart/addCart",
      payload: item
    }),
    getList: () => ({
      type: "goods/getList"
    })
  }
)
class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [], // 默认未选中
      displayCourses: new Array(8).fill({}), // 用于骨架屏展示
      isFirstLoad: true
    };
  }

  componentDidMount() {
    this.props.getList();
  }
  tagSelectChange = (tags, courses = this.props.courses) => {
    // 过滤显示列表
    console.log("changed:" + tags);
    let displayCourses = [];
    tags.forEach(tag => {
      displayCourses = [...displayCourses, ...courses[tag]];
    });
    this.setState({ displayCourses, tags });
    // console.log(this.state.tags)
  };

  componentWillReceiveProps(newProps) {
    console.log("newProps.tags:" + newProps.tags);
    console.log("this.props.tags:" + this.props.tags);
    if (newProps.tags !== this.props.tags) {
      this.tagSelectChange(newProps.tags, newProps.courses);
    }
  }

  addCart = (e, item) => {
    console.log("addCart:" + this.state.tags);
    e.stopPropagation();
    this.props.addCart(item);
  };

  render() {
    // if (this.props.loading.models.goods) {
    //   return <div>加载中...</div>;
    // }
    return (
      <div>
        {/* 分类标签 */}
        <TagSelect onChange={this.tagSelectChange} value={this.state.tags}>
          {this.props.tags.map(tag => {
            return (
              <TagSelect.Option key={tag} value={tag}>
                {tag}
              </TagSelect.Option>
            );
          })}
        </TagSelect>
        {/* 商品列表 */}
        <Row type="flex" justify="start">
          {this.state.displayCourses.map((item, index) => {
            return (
              <Col key={index} span={6} style={{ padding: 10 }}>
                {item.name ? (
                  <Card
                    extra={
                      <Icon
                        onClick={e => this.addCart(e, item)}
                        type="shopping-cart"
                        style={{ fontSize: 18 }}
                      />
                    }
                    hoverable
                    title={item.name}
                    cover={<img src={"/course/" + item.img} />}
                  >
                    <Card.Meta
                      description={
                        <div>
                          <span>¥{item.price}</span>
                          <span style={{ float: "right" }}>
                            <Icon type="user">{item.solded}</Icon>
                          </span>
                        </div>
                      }
                    />
                  </Card>
                ) : (
                  <Skeleton active={true} />
                )}
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
export default Goods;
