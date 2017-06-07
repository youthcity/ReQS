import React from 'react';
import { Row, Col, Card, Icon, message, Alert, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';
import cx from 'classnames';
import moment from 'moment';

import Comment from './Comment';
import styles from './AnswerItem.less';

class AnswerItem extends React.Component {
  constructor(props) {
    super(props);
    const { voteup_count } = props.answer;

    this.state = {
      up_active: false,   // 赞同
      down_active: false, // 反对
      voteup_count,
      is_thank: false,
      comment_content: '',
      is_comments_visible: false,
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
    this.props.voteAnswer(this.props.answer._id, 'vote_up');
  }

  handleHate() {
    this.setState({
      up_active: false,
      down_active: !this.state.down_active,
      voteup_count: (!this.state.down_active)
                    ? this.state.voteup_count - 1
                    : this.state.voteup_count + 1,
    });
    this.props.voteAnswer(this.props.answer._id, 'vote_down');
  }

  handleCommentThank() {
    if (!this.state.is_thank) {
      this.props.addThanks(this.props.answer._id);
    } else {
      message.success('已取消感谢');
    }
    this.setState({
      is_thank: !this.state.is_thank,
    });
  }

  handleChange(e) {
    this.setState({
      comment_content: e.target.value,
    });
  }

  handleSubmitComment() {
    if (!this.state.comment_content) {
      message.error('评论不能为空~');
      return;
    }
    this.props.submitCommet(this.props.answer._id, this.state.comment_content);
    this.handleClearInput();
  }

  handleCommentShow() {
    this.setState({
      is_comments_visible: !this.state.is_comments_visible,
    });
  }

  handleClearInput() {
    this.setState({
      comment_content: '',
    });
  }

  render() {
    const answer = this.props.answer;

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
              <li><a href="javascript:;" onClick={this.handleCommentShow.bind(this)}>{answer.comment.length} 评论</a></li>
              <li>
                <a onClick={this.handleCommentThank.bind(this)} className={cx(styles.like_heart, { [styles.like_active]: this.state.is_thank })}>
                  <Icon type="heart" /> 感谢
                </a>
              </li>
            </ul>
            <div className={styles.avatar_wrap}>
              <img className={styles.user_avatar} src={answer.author.avatar} alt="用户头像" />
            </div>
          </div>
          <div className={cx(styles.comments_wrap, { [styles.hide]: this.state.is_comments_visible })}>
            {answer.comment.map((item, key) => {
              return (
                <Comment
                  key={key}
                  comment={item}
                />
              );
            })}
            <div className={styles.comment_form}>
              <Input style={{ marginRight: '15px' }} type="textarea" value={this.state.comment_content} onChange={this.handleChange.bind(this)} />
              <Button size="large" onClick={this.handleSubmitComment.bind(this)}>提交评论</Button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default AnswerItem;
