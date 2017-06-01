import React from 'react';
import { connect } from 'dva';
import styles from './Question.css';

function Question() {
  return (
    <div className={styles.normal}>
      Route Component: Question
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Question);
