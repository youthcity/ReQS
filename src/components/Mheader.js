import React from 'react';
import { Layout, Menu, Icon, Form, Modal, Dropdown, Button, Input } from 'antd';
import { Link } from 'dva/router';
import cx from 'classnames';

import styles from './Mheader.less';

const FormItem = Form.Item;
const Search = Input.Search;
const { Header } = Layout;

function Mheader() {
  const user = {};
  const isLogin = false;
  const handleLogout = () => {
    console.log('handleLogout');
  };

  const showModal = () => {
    console.log('showModal');
  };

  const dropdownMenu = (
    <Menu onClick={() => { console.log('dropdownMenu'); }}>
      <Menu.Item key="1">提问</Menu.Item>
      <Menu.Item key="2">发布招聘</Menu.Item>
      <Menu.Item key="3">草稿箱</Menu.Item>
    </Menu>
  );

  const userDropMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人资料</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">注销</a>
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/cart">个人资料设置</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={handleLogout} rel="noopener noreferrer" href="javascript:;">注销</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header_wrap}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>
            <a className={styles.logo} href="/" aria-label="ReQS" >ReQS</a>
          </h1>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '60px', fontSize: '16px', fontWeight: '400' }}
          >
            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/">问答</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/category">头条</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/category?id=100">招聘</Link></Menu.Item>
            {/* <Menu.Item key="5"><Link to="/category?id=200">Wiki</Link></Menu.Item>*/}
            {/* <Menu.Item key="6"><Link to="/about">关于我们</Link></Menu.Item>*/}
          </Menu>
        </div>
        <div className={styles.right}>
          {
            isLogin
              ? (
                <ul className={styles.list_wrap}>
                  <li className={styles.item}>
                    <Search
                      placeholder="input search text"
                      style={{ width: 150 }}
                      size="large"
                      onSearch={value => console.log(value)}
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
                    <Link to="/notifications" ><Icon className={styles.icon} type="bell" /></Link>
                  </li>
                  <li className={styles.item}>
                    <Dropdown overlay={userDropMenu}>
                      <a className={styles.user_avatar} href="javascript:;" />
                    </Dropdown>
                  </li>
                </ul>
              )
              : (
                <ul className={styles.list_wrap}>
                  <li className={styles.item}>
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
                      <Link to="/login">
                        <Button size="large" type="primary">登录</Button>
                      </Link>
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
