import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Alert, message, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';

import styles from './Jobs.less';
import ListItem from '../components/ListItem';

function Jobs({ jobs }) {
  const { topic, questionList } = jobs;

  return (
    <div className={styles.wrap}>
      <Card>
        <h2>{topic} <span className={styles.total}>共有 {questionList.length} 个讨论主题</span></h2>
        <div className={styles.summary}>
          <h3 className={styles.notic_title}>招聘须知</h3>
          <p>必须包含的内容:</p>
          <ul className={styles.notic_content}>
            <li>你们是谁？</li>
            <li>你们是做什么的？</li>
            <li>你们提供什么样子的待遇，福利，以及工作环境？</li>
            <li>你们对候选人的要求？</li>
            <li>你们的联系方式</li>
          </ul>
        </div>
        <Col>
          {questionList.map((item, key) => {
            return (
              <ListItem
                key={key}
                question={item}
              />
            );
          })}
        </Col>
      </Card>
    </div>
  );
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

export default connect(mapStateToProps)(Jobs);
