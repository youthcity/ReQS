import React from 'react';
import { Row, Col, Card, Icon, Alert, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';
import cx from 'classnames';
import moment from 'moment';

import Comment from './Comment';
import styles from './AnswerItem.less';

class AnswerItem extends React.Component {
  constructor(props) {
    super(props);
    // const { dataSource } = props;


    this.state = {
      up_active: false,
      down_active: false,
      voteup_count: 2,
      is_like: false,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  handleLike() {
    this.setState({
      up_active: !this.state.up_active,
      down_active: false,
      voteup_count: (!this.state.up_active)
                  ? this.state.voteup_count + 1
                  : this.state.voteup_count - 1,
    });
  }

  handleHate() {
    this.setState({
      up_active: false,
      down_active: !this.state.down_active,
      voteup_count: (!this.state.down_active)
                    ? this.state.voteup_count - 1
                    : this.state.voteup_count + 1,
    });
  }

  render() {
    const answer = {
      author: { username: '11', _id: '11111', avatar: '333' },
      content: '<p>更具可读性，以及通常来说更少的代码。</p>',
      creationDate: '2017-05-31T08:52:54.908Z',
      comment: [1, 2, 3, 4, 5],
      likes: [],
      voteup_count: 2,
    };
    return (
      <div className={styles.item_wrap}>
        <div className={styles.left}>
          <button
            onClick={this.handleLike.bind(this)}
            className={cx(styles.btn, styles.up, { [styles.pressed]: this.state.up_active })}
          >
            <Icon className={styles.vote_up} type="caret-up" />
            <span>{this.state.voteup_count}</span>
          </button>
          <button
            onClick={this.handleHate.bind(this)}
            className={cx(styles.btn, styles.down, { [styles.pressed]: this.state.down_active })}
          >
            <Icon type="caret-down" />
          </button>
        </div>
        <div className={styles.right}>
          <div
            className={styles.answer_content}
            dangerouslySetInnerHTML={{ __html: answer.content }}
          />
          <div className={styles.answer_info}>
            <ul className={styles.info_list}>
              <li>{moment(answer.creationDate).fromNow()}回答</li>
              <li><a href="javascript:;">{answer.comment.length} 评论</a></li>
              <li>
                <a className={cx(styles.like_heart, { [styles.like_active]: this.state.is_like })}>
                  <Icon type="heart" /> 喜欢
                </a>
              </li>
            </ul>
            <div className={styles.avatar_wrap}>
              <img className={styles.user_avatar} src={answer.author.avatar} alt="用户头像" />
            </div>
          </div>
          <div className={styles.comments_wrap}>
            <Comment />
            <Comment />
            <Comment />
            <div className={styles.comment_form}>
              <Input style={{ marginRight: '15px' }} type="textarea" />
              <Button size="large">提交评论</Button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default AnswerItem;
