import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Card, Icon, Badge } from 'antd';
import cx from 'classnames';
import moment from 'moment';
import { Link } from 'dva/router';

import styles from './Home.less';

moment.locale('zh-CN');
const data = require('../assets/data.json').topics;

function Home({ dispatch, app }) {
  const { isLogin } = app;
  const showLoginModal = () => {
    dispatch({
      type: 'app/showLoginModal',
    });
  };

  const getTopicItems = () => {
    return data.map((item, key) => {
      return (
        <div className={styles.topic} key={key}>
          <div className={styles.topic_avatar}>
            <Link to={`/users/${item.user.id}`}><img alt={item.user.name} src={item.user.avatar_url} style={{ width: '48px', height: '48px', borderRadius: '24px' }} /></Link>
          </div>
          <div className={styles.topic_infos}>
            <div className={styles.title}>
              <Link to={`/topics/${item.id}`} className={styles.a_style}>
                <span className={styles.topic_node}>{item.node_name}</span>
                {item.title}
                {
                  item.excellent === 1 && (
                    <Icon type="heart" style={{ color: '#F44336', marginLeft: '5px', marginRight: '5px', lineHeight: '30px' }} />
                  )
                }
              </Link>
            </div>
            <div className={styles.topic_info}>
              <Link to={`/users/${item.user.id}`}>{item.user.name}</Link>
              {
                item.replies_count === 0
                ? <span> · 发布于 {moment(item.updated_at).fromNow()} </span>
                : <span> · 最后由 <Link to={`/users/${item.last_reply_user_id}`}>{item.last_reply_user_login}</Link> 回复于 {moment(item.replied_at).fromNow()} </span>
              }
            </div>
          </div>
          <div className={styles.topic_replies_count}>
            <span className={styles.span_count}>{item.replies_count}</span>
          </div>
        </div>
      );
    });
  };


  return (
    <div className={styles.wrap}>
      {isLogin ?
        <div />
        : (
          <div className={styles.media_panel}>
            <h4>
              欢迎加入ReQS知识问答社区，向世界分享你的见解~
              <Link to="/register"><Button size="large" type="primary" style={{ marginLeft: '10px' }}>立即注册</Button></Link>
              <Button onClick={showLoginModal} size="large" style={{ marginLeft: '10px' }} >用户登录</Button>
            </h4>
          </div>
        )
      }
      <Row gutter={16} className={styles.card_panel}>
        <Col span="6">
          <Link to="/topic">
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <div className={styles.card_icon}>
                <Icon className={styles.icon} style={{ color: '#7E57C2' }} type="appstore-o" />
              </div>
              <div className={styles.card_text}>
                <span>ReQS 问答</span>
                <Icon type="arrow-right" style={{ fontSize: '16px' }} />
              </div>
            </Card>
          </Link>
        </Col>
        <Col span="6">
          <Link to="/wiki">
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <div className={styles.card_icon}>
                <Icon className={styles.icon} style={{ color: '#9CCC65' }} type="gift" />
              </div>
              <div className={styles.card_text}>
                <span>技术文档</span>
                <Icon type="arrow-right" style={{ fontSize: '16px' }} />
              </div>
            </Card>
          </Link>
        </Col>
        <Col span="6">
          <Link to="/jobs">
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <div className={styles.card_icon}>
                <Icon className={styles.icon} style={{ color: '#03A9F4' }} type="team" />
              </div>
              <div className={styles.card_text}>
                <span>招聘与求职</span>
                <Icon type="arrow-right" style={{ fontSize: '16px' }} />
              </div>
            </Card>
          </Link>
        </Col>
        <Col span="6">
          <Link to="/news">
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <div className={styles.card_icon}>
                <Icon className={styles.icon} style={{ color: '#009688' }} type="smile-o" />
              </div>
              <div className={styles.card_text}>
                <span>精彩问答</span>
                <Icon type="arrow-right" style={{ fontSize: '16px' }} />
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
      <div className={styles.suggest_topics_panel}>
        <div className={styles.panel_header}>
          社区精彩问答
        </div>
        <div className={styles.main}>
          {getTopicItems()}
        </div>
        <div className={styles.panel_footer}>
          <Link href="/topic?type=excellent">查看更多优质问答...</Link>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Home);
