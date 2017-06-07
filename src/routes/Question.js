import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Alert, message, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';
import cx from 'classnames';
import moment from 'moment';
import LzEditor from 'react-lz-editor';


import styles from './Question.less';
import AnswerItem from '../components/AnswerItem';

moment.locale('zh-CN');

const ButtonGroup = Button.Group;

function Question({ q, dispatch }) {
  const { isLike, question, answers, editorContent, isEditorVisible, currentAnswerListOrder } = q;
  const handleLike = () => {
    if (!isLike) {
      dispatch({
        type: 'q/addLike',
        payload: question._id,
      });
    } else {
      dispatch({
        type: 'q/handleHate',
      });
    }
  };


  // 提交评论
  const submitCommet = (id, content) => {
    if (id && content) {
      dispatch({
        type: 'q/submitComment',
        payload: {
          id,
          content,
        },
      });
    }
  };

  // 回答感谢
  const addThanks = (id) => {
    if (id) {
      dispatch({
        type: 'q/addThanks',
        payload: id,
      });
    }
  };

  const voteAnswer = (answerId, type) => {
    if (answerId) {
      dispatch({
        type: 'q/voteAnswer',
        payload: {
          id: answerId,
          type,
        },
      });
    }
  };

  const getTags = () => {
    return question.tags.map((item, key) => {
      return (<Tag key={key} color="green" style={{ fontSize: '20px' }}>{item.tagName}</Tag>);
    });
  };

  const getReplies = () => {
    return answers.map((item, key) => {
      return (
        <AnswerItem
          key={key}
          answer={item}
          submitCommet={submitCommet}
          addThanks={addThanks}
          voteAnswer={voteAnswer}
        />
      );
    });
  };

  // 富文本 配置
  let answerContent = '';
  const receiveHtml = (content) => {
    answerContent = content;
    console.log('Recieved content', content);
  };
  const handleSubmitAnswer = () => {
    if (answerContent.length < 15) {
      message.error('答案不能少于15个字哦~请重新输入你的答案');
      return;
    }
    dispatch({
      type: 'q/submitAnswer',
      payload: {
        content: answerContent,
        questionId: question._id,
      },
    });
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

  const handleFavorite = () => {
    dispatch({
      type: 'q/addFavorite',
      payload: question._id,
    });
  };

  const handleFollow = () => {
    console.log('==question====', question.author._id);

    dispatch({
      type: 'q/addFollow',
      payload: question.author._id,
    });
  };

  const handleFetchAnswerListByType = (type) => {
    console.log(type);
    dispatch({
      type: 'q/fetchAnswerListByType',
      payload: {
        id: question._id,
        type,
      },
    });
  };

  return (
    <div className={styles.wrap}>
      <Row gutter={24}>
        <Col style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.left} span={18}>
          <div className={styles.question_wrap}>
            <div className={styles.panel_heading}>
              <h1 className={styles.question_title}>
                <span className={styles.label_question}>问</span>
                {question.title}
              </h1>
              <div className={styles.tags_wrap}>
                {getTags()}
                <div className={styles.question_author}>
                  <a className={styles.mr5} href={`/people/${question.author._id}`}>{question.author.username}</a>
                  &#x3000;{moment(question.creationDate).fromNow()} 提问
              </div>
              </div>

            </div>
            {question.excellent === 1
            ? <Alert style={{ borderRadius: 0, fontSize: '16px' }} message="本问题已被设为推荐问题~" type="info" showIcon />
            : <div />
          }
            <div
              className={styles.panel_content}
              dangerouslySetInnerHTML={{ __html: question.content }}
            />
            <div className={styles.panel_footer}>
              <ButtonGroup size="large">
                <Button onClick={handleLike} icon="like">&nbsp;{question.likes.length} 个赞</Button>
                <Button onClick={handleFollow} icon="eye">关注</Button>
                <Button onClick={handleFavorite} icon="book">收藏</Button>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <Card
              bodyStyle={{ padding: '15px' }}
              className={styles.replies_wrap}
              title={`共收到 ${answers.length} 条回答`}
              extra={<ButtonGroup>
                <Button onClick={handleFetchAnswerListByType.bind(null, 'default')} disabled={currentAnswerListOrder === 'default'}>默认排序</Button>
                <Button onClick={handleFetchAnswerListByType.bind(null, 'time')} disabled={currentAnswerListOrder === 'time'}>时间排序</Button>
              </ButtonGroup>
                    }
            >
              {getReplies()}
            </Card>
          </div>
          <Card className={styles.answer_editor} title="撰写答案">
            <div className={styles.editor_wrap}>
              {
              isEditorVisible ?
                <LzEditor
                  active
                  importContent={editorContent}
                  cbReceiver={receiveHtml}
                  uploadConfig={uploadConfig}
                  fullScreen
                  color={false}
                  convertFormat="html"
                />
              :
                <div />
            }
            </div>
            <div className={styles.btn_wrap}>
              <Button onClick={handleSubmitAnswer} className={styles.submit_btn} type="primary" size="large" >提交答案</Button>
            </div>
          </Card>
        </Col>
        <Col className={styles.right} span={6}>
          <Card style={{ width: 240 }} bodyStyle={{ padding: '20px' }}>
            <a onClick={handleLike} href="javascript:;" className={styles.like_wrap}>
              <Icon className={cx(styles.default_like, { [styles.active]: isLike })} type="heart" />
              <span>{question.likes.length}个赞</span>
            </a>

            <div className={styles.group}>
              <ButtonGroup size="large" className={styles.button_group}>
                <Button onClick={handleFollow} icon="eye-o">关注</Button>
                <Button onClick={handleFavorite} icon="book">收藏</Button>
              </ButtonGroup>
            </div>
            <div className={styles.sharing_wrap}>
              <div className="jiathis_style">
                <a className="jiathis_button_qzone" />
                <a className="jiathis_button_tsina" />
                <a className="jiathis_button_tqq" />
                <a className="jiathis_button_weixin" />
                <a className="jiathis_button_renren" />
                <a href="http://www.jiathis.com/share" className="jiathis jiathis_txt jtico jtico_jiathis" target="_blank" />
              </div>
            </div>
            <h4 className={styles.relpy_title}>共收到&nbsp;{answers.length}&nbsp;条回答</h4>
            <h4 className={styles.relpy_title}>{question.pv}&nbsp;次阅读</h4>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps({ q }) {
  return { q };
}

export default connect(mapStateToProps)(Question);
