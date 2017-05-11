import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';


import styles from './App.less';
import Mheader from '../components/Mheader';
// import Footer from '../components/Footer';

const { Header, Content, Footer } = Layout;

function App({ children }) {
  return (
    <Layout className="layout">
      <Mheader />
      <Content style={{ padding: '0 50px' }}>
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
