import React from 'react';
import { Layout, Menu, Icon, Form, Modal, Dropdown, Button, Input, Checkbox } from 'antd';
import { Link } from 'dva/router';
import cx from 'classnames';

import styles from './Mheader.less';

const FormItem = Form.Item;
const Search = Input.Search;
const { Header } = Layout;

function Mheader({ location, dispatch, app,
   loginModalVisible, confirmLoading, showModal, handleOk, handleCancel, form, handleLogout }) {
  const { user, isLogin } = app;

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOk();
  };

  const dropdownMenu = (
    <Menu onClick={() => { console.log('dropdownMenu'); }}>
      <Menu.Item key="1"><Link to="/ask">提问</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/ask?type=jobs">发布招聘</Link></Menu.Item>
    </Menu>
  );

  const userDropMenu = (
    <Menu>
      <Menu.Item>
        <Link to={`/people/${user._id}`}>我的主页</Link>
      </Menu.Item>
      <Menu.Item>
        <a
          onClick={handleLogout}
          rel="noopener noreferrer"
          href="javascript:;"
        >
          注销
        </a>
      </Menu.Item>
    </Menu>
  );

  const handleSearch = (value) => {
    if (!value) {
      return;
    }
    dispatch({
      type: 'app/searchQuestion',
      payload: value,
    });
  };

  return (
    <Header className={styles.header_wrap}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>
            <a className={styles.logo} href="/" aria-label="ReQS" >ReQS</a>
          </h1>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '60px', fontSize: '14px', fontWeight: '400' }}
          >
            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/topic">问答</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/news">头条</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/jobs">招聘</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/wiki">Wiki</Link></Menu.Item>
            {/* <Menu.Item key="5"><Link to="/category?id=200">Wiki</Link></Menu.Item>*/}
          </Menu>
        </div>
        <div className={styles.right}>
          {
            isLogin
              ? (
                <ul className={styles.list_wrap}>
                  <li className={cx(styles.item, styles.search)}>
                    <Search
                      placeholder="input search text"
                      style={{ width: 150 }}
                      size="large"
                      onSearch={handleSearch}
                    />
                  </li>
                  <li className={styles.item}>
                    <Dropdown overlay={dropdownMenu}>
                      <Button style={{ marginLeft: 8 }}>
                        <Icon type="plus" className={styles.icon} style={{ fontSize: '16px', paddingRight: '5px' }} /><Icon className={styles.icon} type="down" />
                      </Button>
                    </Dropdown>
                  </li>
                  <li className={styles.item}>
                    {/* <Link to="/notifications" ><Icon className={styles.icon} type="bell" /></Link>*/}
                  </li>
                  <li className={styles.item}>
                    <Dropdown overlay={userDropMenu}>
                      <a
                        className={styles.user_avatar}
                        href="javascript:;"
                        style={{ backgroundImage: `url(${user.avatar})` }}
                      />
                    </Dropdown>
                  </li>
                </ul>
              )
              : (
                <ul className={styles.list_wrap}>
                  <li className={cx(styles.item, styles.search)}>
                    <Search
                      placeholder="input search text"
                      style={{ width: 150 }}
                      size="large"
                      onSearch={value => console.log(value)}
                    />
                  </li>
                  <li className={styles.item}>
                    <Button.Group >
                      <Link to="/register">
                        <Button size="large" type="primary">注册</Button>
                      </Link>
                      <Button onClick={showModal} size="large" type="primary">登录</Button>
                      <div>
                        <Modal
                          title="登录"
                          visible={loginModalVisible}
                          onOk={handleOk}
                          confirmLoading={confirmLoading}
                          onCancel={handleCancel}
                          footer={null}
                          width="380px"
                        >
                          <Form onSubmit={handleSubmit} className={styles.login_form}>
                            <FormItem hasFeedback>
                              {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请填写用户名' }],
                              })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
                              )}
                            </FormItem>
                            <FormItem hasFeedback>
                              {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请填写密码' }],
                              })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
                              )}
                            </FormItem>
                            <FormItem>
                              {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                              })(
                                <Checkbox>记住登录状态</Checkbox>,
                              )}
                              {/* <a className="login-form-forgot" href="">Forgot password</a>*/}
                              <Button type="primary" htmlType="submit" loading={confirmLoading} className={styles.login_form_button}>
                                登录
                              </Button>
                              Or <a href="/register">立即注册!</a>
                            </FormItem>
                          </Form>
                        </Modal>
                      </div>
                    </Button.Group>
                  </li>
                </ul>
              )
          }
        </div>
      </div>
    </Header>
  );
}

export default Mheader;
