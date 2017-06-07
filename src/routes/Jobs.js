import React from 'react';
import { connect } from 'dva';
import styles from './Jobs.css';

function Jobs() {
  return (
    <div className={styles.normal}>
      Route Component: Jobs
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Jobs);
