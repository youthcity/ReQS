import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Alert, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';
import cx from 'classnames';
import moment from 'moment';

import styles from './Topic.less';

function Topic({ topic }) {
  return (
    <div className={styles.wrap}>
      <Row className={styles.nav}>
        <Card bodyStyle={{ padding: '10px' }}>
          <ul className={styles.nav_list}>
            <li><a className={cx({ [styles.active]: true })} href="javascript:;">默认</a></li>
            <li><a href="javascript:;"><Icon type="smile-o" />&nbsp;优质帖子</a></li>
            <li><a href="javascript:;">无人问津</a></li>
            <li><a href="javascript:;">最新发布</a></li>
          </ul>
        </Card>
      </Row>
      <Row className={styles.main} gutter={24}>
        <Col className={styles.main_left} span={18}>
            left
        </Col>
        <Col className={styles.main_right} span={6}>
          <Card
            bodyStyle={{ padding: '15px' }}
            title="今天，你编程遇到了什么问题呢？"
          >
            <Button size="large" type="primary" style={{ width: '100%' }}>提问</Button>
          </Card>
          <Card
            bodyStyle={{ padding: '15px' }}
            className={styles.siderbar_b}
            title="小帖士"
          >
            <p className={styles.text}>
              ReQS初衷是帮助人们可以更好的分享彼此的知识、经验和见解，发表「有用」「有帮助」「有质量」的内容，不仅可以帮助他人，也会让自己获益。
            </p>
            <p className={styles.text}>不要攻击、故意贬低用户或其写的内容，尊重不同的观点，不恶意揣测动机。</p>
          </Card>
          <Card
            bodyStyle={{ padding: '0' }}
            className={styles.siderbar_c}
            title="社区导航"
          >
            <ul className={styles.list_group}>
              <li className={styles.list_item}>
                <a href="http://react-china.org" rel="nofollow" title="react china 社区" target="_blank">
                  <img style={{ width: '70%' }} src="http://opbc041f6.bkt.clouddn.com/sf/logo/react_china_logo.png" />
                </a>
              </li>
              <li className={styles.list_item}>
                <a href="https://cnodejs.org/" rel="nofollow" title="CNode 社区" target="_blank">
                  <img style={{ width: '70%' }} src="http://opbc041f6.bkt.clouddn.com/sf/logo/cnode_logo.png" />
                </a>
              </li>
              <li className={styles.list_item}>
                <a href="https://stackoverflow.com/" rel="nofollow" title="stackoverflow 社区" target="_blank">
                  <img style={{ width: '70%' }} src="http://opbc041f6.bkt.clouddn.com/sf/logo/stackoverflow_logo.png" />
                </a>
              </li>
              <li className={styles.list_item}>
                <a href="http://golangtc.com/" rel="nofollow" title="Golang 社区" target="_blank">
                  <img style={{ width: '70%' }} src="http://opbc041f6.bkt.clouddn.com/sf/logo/golang_logo.png" />
                </a>
              </li>
              <li className={styles.list_item}>
                <a href="https://laravel-china.org/" rel="nofollow" title="PHP 社区" target="_blank">
                  <img style={{ width: '70%' }} src="http://opbc041f6.bkt.clouddn.com/sf/logo/php_logo.png" />
                </a>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps({ topic }) {
  return { topic };
}

export default connect(mapStateToProps)(Topic);
