import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Icon, Menu, Table, Form, Input, Modal, Button, Select } from 'antd';
import cx from 'classnames';
import moment from 'moment';

import styles from './People.less';

moment.locale('zh');
const FormItem = Form.Item;
const Option = Select.Option;


function People({ app, form, dispatch, people }) {
  // const user = {
  //   id: 1,
  //   avatar: 'http://opbc041f6.bkt.clouddn.com/sf/avataravatar_1.jpeg',
  // };
  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const { user } = app;
  const { editModalVisible, confirmLoading } = people;

  const isSelf = true;

  const currentTitle = '我的回答';

  const dataSource = [{
    key: '1',
    pv: 0,
    title: 'docker绑定了nginx端口 外部访问不到',
    creationDate: '2017-05-31T08:52:54.907Z',
  }, {
    key: '1',
    pv: 0,
    title: 'shadowsocks为何不搞个java版本？',
    creationDate: '2017-05-31T08:52:54.907Z',
  }];

  const columns = [{
    title: '浏览',
    dataIndex: 'pv',
    key: 'pv',
    render: (text, record, index) => {
      return (<span className={styles.label}>{text} 次</span>);
    },
  }, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '时间',
    dataIndex: 'creationDate',
    key: 'creationDate',
    render: (text, record, index) => {
      return (<span>{moment(text).format('LLL')}</span>);
    },
  }];


  const getMain = () => {
    return (<Table dataSource={dataSource} columns={columns} />);
  };

  // modal func
  const handleOk = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
      dispatch({
        type: 'people/editUser',
        payload: values,
      });
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch({
      type: 'people/hideEditModal',
    });
  };

  const handleShowEditModal = () => {
    dispatch({
      type: 'people/showEditModal',
    });
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <div className={styles.wrap}>
      <Row className={styles.header}>
        <Col span={6} className={styles.left}>
          <Link to={`/people/${user._id}`} style={{ textAlign: 'center' }} >
            <img className={styles.avatar} src={user.avatar} alt="用户头像" />
          </Link>
          <p className={styles.pv}><Icon type="eye-o" className={styles.icon} />&nbsp;主页被访问 <span className={styles.highlight} >{user.pv}</span> 次</p>
        </Col>
        <Col span={8} className={styles.center}>
          <h1 className={styles.title}>{user.username}</h1>
          <p className={styles.item}><Icon type="environment-o" className={styles.icon} /> {user.location ? user.location : '来自神秘的地方'}</p>
          <p className={styles.item}><Icon type="solution" className={styles.icon} /> {user.email ? user.email : '没有填联系地址'}</p>
          <p className={styles.item}>性别 &#x3000;{user.gender === 'x' ? '保密' : user.email === 'm' ? <Icon type="man" /> : <Icon type="woman" />}</p>
          <p className={styles.item}><Icon type="calendar" className={styles.icon} />注册于 {moment(user.creationDate).format('YYYY-MM-DD')}</p>
        </Col>
        <Col span={12} className={styles.right}>
          <div className={styles.container}>
            <div className={styles.heading}>
              <div className={styles.dot_wrap}>
                <span className={cx(styles.heading_dot, styles.dot_red)} />
                <span className={cx(styles.heading_dot, styles.dot_yellow)} />
                <span className={cx(styles.heading_dot, styles.dot_green)} />
              </div>
              <div className={styles.right_edit} onClick={handleShowEditModal}>
                { isSelf ?
                 (<span><Icon type="edit" />&nbsp;编辑</span>) : '' }
                <Modal
                  title="编辑我的个人信息"
                  visible={editModalVisible}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  footer={null}
                  width="480px"
                >
                  <Form layout={'vertical'} onSubmit={handleOk} className={styles.login_form}>
                    <FormItem
                      label="性别"
                    >
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请选择你的性别' }],
                      })(
                        <Select placeholder="选择你的性别">
                          <Option value="x">保密</Option>
                          <Option value="m">男生</Option>
                          <Option value="f">女生</Option>
                        </Select>,
                              )}
                    </FormItem>
                    <FormItem
                      label="居住地"
                    >
                      {getFieldDecorator('location', {
                      })(
                        <Input />,
                              )}
                    </FormItem>
                    <FormItem
                      label="介绍一下自己"
                    >
                      {getFieldDecorator('aboutMe', {
                      })(
                        <Input type="textarea" rows={3} />,
                              )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" loading={confirmLoading} className={styles.login_form_button}>
                       提交
                      </Button>
                      &nbsp;&nbsp;
                      <Button onClick={handleCancel}>取消</Button>
                    </FormItem>
                  </Form>
                </Modal>
              </div>
            </div>
            <div className={styles.profile_body}>
              {user.aboutMe ? user.aboutMe : '这个人好懒什么都不写~'}
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={24} className={styles.main}>
        <Col span={6} className={styles.menu_wrap}>
          <Menu
            mode="vertical"
            style={{ backgroundColor: '#f7f7f7', fontWeight: '400' }}
          >
            <Menu.Item style={{ fontSize: '16px' }}>{isSelf ? '我' : 'TA'}的主页</Menu.Item>
            <Menu.Item style={{ fontSize: '16px' }}>{isSelf ? '我' : 'TA'}的提问</Menu.Item>
            <Menu.Item style={{ fontSize: '16px' }}>{isSelf ? '我' : 'TA'}的回答</Menu.Item>
            <Menu.Item style={{ fontSize: '16px' }}>{isSelf ? '我' : 'TA'}关注的人</Menu.Item>
            <Menu.Item style={{ fontSize: '16px' }}>{isSelf ? '我' : 'TA'}的粉丝</Menu.Item>
          </Menu>
        </Col>
        <Col span={18} className={styles.right}>
          <h2 className={styles.right_title}>{currentTitle}</h2>
          {getMain()}
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps({ app, people }) {
  return { app, people };
}

export default connect(mapStateToProps)(Form.create()(People));
