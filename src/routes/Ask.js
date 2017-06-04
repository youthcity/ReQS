import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button } from 'antd';
import LzEditor from 'react-lz-editor';

import styles from './Ask.less';

const Option = Select.Option;
const FormItem = Form.Item;

function Ask({ form, ask, dispatch }) {
  const { tags } = ask;
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  let editorContent = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        console.log(errors);
        console.log(values);
        return;
      }

      if (editorContent) {
        dispatch({
          type: 'ask/addQuestion',
          payload: {
            content: editorContent,
            title: values.title,
            tags: values.tags,
          },
        });
      }
    });
  };

  const selectOption = () => {
    return tags.map((item, key) => <Option key={item._id}>{item.tagName}</Option>);
  };
  const handleChange = (value) => {
    console.log(value);
  };

  // editor
  const receiveHtml = (content) => {
    editorContent = content;
    console.log('Recieved content', content);
  };
  const uploadConfig = {
    QINIU_URL: 'http://up-z2.qiniu.com', // 上传地址，现在暂只支持七牛上传
    QINIU_IMG_TOKEN_URL: 'http://localhost:3000/upload', // 请求图片的token
    QINIU_PFOP: {
      url: 'http://www.yourServerAddress.mobi/doQiniuPicPersist.do', // 七牛持久保存请求地址
    },
    QINIU_VIDEO_TOKEN_URL: 'http://www.yourServerAddress.mobi/getUptokenOfQiniu.do', // 请求媒体资源的token
    QINIU_FILE_TOKEN_URL: 'http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch', // 其他资源的token的获取
    QINIU_IMG_DOMAIN_URL: 'http://opbc041f6.bkt.clouddn.com', // 图片文件地址的前缀
    QINIU_DOMAIN_VIDEO_URL: 'http://opbc041f6.bkt.clouddn.com/', // 视频文件地址的前缀
    QINIU_DOMAIN_FILE_URL: 'http://opbc041f6.bkt.clouddn.com/', //其他文件地址前缀
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
          {getFieldDecorator('tags', {
            rules: [{ required: true, message: '请输入标签!' }],
          })(
            <Select
              size="large"
              mode="multiple"
              style={{ width: '100%' }}
              searchPlaceholder="标签模式"
              onChange={handleChange}
              optionFilterProp="children"
              placeholder="标签，如：react 可使用回车自动分隔"
            >
              {selectOption()}
            </Select>,
          )}
        </FormItem>
        <FormItem >
          <LzEditor
            active
            importContent={editorContent}
            cbReceiver={receiveHtml}
            uploadConfig={uploadConfig}
            fullScreen={false}
            convertFormat="html"
          />
        </FormItem>
        <div className={styles.button_wrap}>
          <Button type="primary" htmlType="submit" size="large">发布问题</Button>
        </div>
      </Form>
    </div>
  );
}

function mapStateToProps({ ask }) {
  return { ask };
}

export default connect(mapStateToProps)(Form.create()(Ask));
