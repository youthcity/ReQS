import React from 'react';
import { connect } from 'dva';
import styles from './App.css';

function App() {
  return (
    <div className={styles.normal}>
      Route Component: App
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
