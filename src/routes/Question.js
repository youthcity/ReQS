import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Alert, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';
import cx from 'classnames';
import moment from 'moment';

import styles from './Question.less';
import AnswerItem from '../components/AnswerItem';

moment.locale('zh-CN');

const ButtonGroup = Button.Group;
const html_content = `
 <p >菲菲<br>
<span style="color:#Da4453">你小明我的世界~~</span></p>
<p ><br></p>
<p ><img src="http://opbc041f6.bkt.clouddn.com/61573335658058879564.jpeg"/></p>
<p ><br></p>
`;
function Question() {
  const question = {
    author: { _id: 11111, username: 'youthcity' },
    title: '[北京][2017年6月18日] Rails Girls 复活啦 2017 北京活动报名 | 少女们一天学编程',
    content: '',
    answer: [1, 2, 3, 45, 6],
    likes: [1, 2, 3, 4],
    excellent: 1, // 0 false 1 true
    pv: 4,
    tags: ['react', 'tt', 'js'],
    creationDate: '2017-05-31T08:52:54.908Z',
    updatedDate: '2017-06-31T08:52:54.908Z',
  };

  const isLike = false;

  const handleGoBottom = () => {
    console.log('go bottom');
  };

  const getTags = () => {
    return question.tags.map((item, key) => {
      return (<Tag key={key} color="green" style={{ fontSize: '20px' }}>{item}</Tag>);
    });
  };

  const get_replies = () => {
    return (
      <div />
    );
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
                  {moment(question.creationDate).fromNow()} 提问
              </div>
              </div>

            </div>
            {question.excellent === 1
            ? <Alert style={{ borderRadius: 0, fontSize: '16px' }} message="本问题已被设为推荐问题~" type="info" showIcon />
            : <div />
          }
            <div
              className={styles.panel_content}
              dangerouslySetInnerHTML={{ __html: html_content }}
            />
            <div className={styles.panel_footer}>
              <ButtonGroup size="large">
                <Button icon="like">{question.likes.length} 个赞</Button>
                <Button icon="eye">关注</Button>
                <Button icon="book">收藏</Button>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <Card
              bodyStyle={{ padding: '15px' }}
              className={styles.replies_wrap}
              title={`共收到 ${question.answer.length} 条回答`}
              extra={<ButtonGroup>
                <Button disabled>默认排序</Button>
                <Button>时间排序</Button>
              </ButtonGroup>
                    }
            >
              <AnswerItem />
              {get_replies()}
            </Card>
          </div>
          <Card className={styles.answer_editor} title="撰写答案">
            <div className={styles.editor_wrap}>
              <p>3ssss</p>
            </div>
            <div className={styles.btn_wrap}>
              <Button className={styles.submit_btn} type="primary" size="large" >提交答案</Button>
            </div>
          </Card>
        </Col>
        <Col className={styles.right} span={6}>
          <Card style={{ width: 240 }} bodyStyle={{ padding: '20px' }}>
            <a href="javascript:;" className={styles.like_wrap}>
              <Icon className={cx(styles.default_like, { [styles.active]: isLike })} type="heart" />
              <span>{question.likes.length}个赞</span>
            </a>

            <div className={styles.group}>
              <ButtonGroup size="large" className={styles.button_group}>
                <Button icon="eye-o">关注</Button>
                <Button icon="book">收藏</Button>
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
            <h4 className={styles.relpy_title}>共收到&nbsp;{question.answer.length}&nbsp;条回答</h4>
            <h4 className={styles.relpy_title}>{question.pv}&nbsp;次阅读</h4>
            {/* <Button onClick={handleGoBottom} className={styles.go_down}><Icon type="arrow-down" /></Button>*/}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Question);
