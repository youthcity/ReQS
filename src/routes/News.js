import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';

import styles from './News.less';
import ListItem from '../components/ListItem';

function News({ news }) {
  const { title, questionList } = news;

  return (
    <div className={styles.wrap}>
      <Card title={title}>
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
    </div>
  );
}

function mapStateToProps({ news }) {
  return { news };
}

export default connect(mapStateToProps)(News);
