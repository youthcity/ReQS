import React from 'react';
import { connect } from 'dva';
import { Layout, Form } from 'antd';


import styles from './App.less';
import Mheader from '../components/Mheader';
// import Footer from '../components/Footer';

const { Content, Footer } = Layout;

function App({ children, form, app, dispatch, location }) {
  const { loginModalVisible, confirmLoading } = app;
  const { validateFieldsAndScroll } = form;

  const headerProps = {
    app,
    location,
    loginModalVisible,
    confirmLoading,
    form,
    dispatch,
    showModal() {
      dispatch({
        type: 'app/showLoginModal',
      });
    },
    handleOk() {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return;
        }
        console.log(values);
        dispatch({
          type: 'app/login',
          payload: values,
        });
      });
    },
    handleCancel() {
      console.log('Clicked cancel button');
      dispatch({
        type: 'app/hideLoginModal',
      });
    },
    handleLogout() {
      dispatch({
        type: 'app/logout',
      });
    },
  };

  return (
    <Layout className={styles.layout}>
      <Mheader
        {...headerProps}
      />
      <Content className={styles.main}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
            Copyright ©2017 Created by youthcity
    </Footer>
    </Layout>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Form.create()(App));
