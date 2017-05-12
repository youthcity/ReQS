import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';

import styles from './Register.less';

const FormItem = Form.Item;

function Register({ dispatch, form, register }) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const { registerLoading } = register;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({
        type: 'register/signin',
        payload: values,
      });
    });
  };

  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入的不一致!');
    } else {
      callback();
    }
  };
  const checkConfirm = (rule, value, callback) => {
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h4>注册新用户</h4>
      </div>
      <Form
        onSubmit={handleSubmit}
        layout="vertical"
        className={styles.form}
      >
        <FormItem
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '不是有效邮箱!',
            }, {
              required: true, message: '请输入你的邮箱地址!',
            }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入你的密码!',
            }, {
              validator: checkConfirm,
            }],
          })(
            <Input type="password" />,
          )}
        </FormItem>
        <FormItem
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认你的密码!',
            }, {
              validator: checkPassword,
            }],
          })(
            <Input type="password" />,
          )}
        </FormItem>
        <Button loading={registerLoading} className={styles.btn_submit} type="primary" htmlType="submit" size="large">注册</Button>
      </Form>
    </div>
  );
}

function mapStateToProps({ register }) {
  return { register };
}

export default connect(mapStateToProps)(Form.create()(Register));
