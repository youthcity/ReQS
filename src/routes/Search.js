import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Alert, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';

import styles from './Search.less';
import ListItem from '../components/ListItem';

function Search({ search, location }) {
  const { questionList } = search;
  const query = location.query && location.query.q;
  const title = `关于 “${query}” 的搜索结果, 共 ${questionList.length} 条`;
  const isNoResult = questionList.length === 0;
  return (
    <Card title={title} className={styles.wrap}>
      <Col className={styles.img_wrap}>
        {
          isNoResult ? <img className={styles.no_find} src="http://opbc041f6.bkt.clouddn.com/sf/avatar404.gif" alt="404" />
          : <div />
        }
      </Col>
      <Col className={styles.list_wrap} >
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
  );
}

function mapStateToProps({ search }) {
  return { search };
}

export default connect(mapStateToProps)(Search);
