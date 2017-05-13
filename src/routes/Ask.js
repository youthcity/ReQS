import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select } from 'antd';

import styles from './Ask.less';

const Option = Select.Option;
const FormItem = Form.Item;

function Ask({ form }) {
  const { getFieldDecorator } = form;
  const handleSubmit = () => {
    console.log('.....');
  };

  const selectData = [1, 2, 34, 5, 6, 7, 8, 9];
  const selectOption = () => {
    return selectData.map((item, key) => <Option key={item}>{item}</Option>);
  };
  const handleChange = (value) => {
    console.log(value);
  };


  return (
    <div className={styles.wrap}>
      <Form
        onSubmit={handleSubmit}
      >
        <FormItem >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!', whitespace: true }],
          })(
            <Input className={styles.input_style} placeholder="标题：一句话说清问题，用问号结尾" />,
          )}
        </FormItem>
        <FormItem >
          {getFieldDecorator('topics', {
            rules: [{ required: true, message: '请输入标签!' }],
          })(
            <Select
              size="large"
              mode="tags"
              style={{ width: '100%' }}
              searchPlaceholder="标签模式"
              onChange={handleChange}
              placeholder="标签，如：php 可使用逗号,分号;分隔"
            >
              {selectOption()}
            </Select>,
          )}
        </FormItem>
      </Form>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(Ask));
