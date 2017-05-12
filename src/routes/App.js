import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';


import styles from './App.less';
import Mheader from '../components/Mheader';
// import Footer from '../components/Footer';

const { Header, Content, Footer } = Layout;

function App({ children }) {
  return (
    <Layout className={styles.layout}>
      <Mheader />
      <Content className={styles.main}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
            Copyright ©2017 Created by youthcity
    </Footer>
    </Layout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
