import React from 'react';
import { Row, Col, Card, Icon, Alert, Menu, Table, Form, Input, Modal, Button, Select, Tag } from 'antd';
import cx from 'classnames';
import moment from 'moment';

import styles from './Comment.less';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    // const { dataSource } = props;


    this.state = {
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  render() {
    const comment = this.props.comment;
    return (
      <div className={styles.wrap}>
        <div className={styles.heading}>
          <img className={styles.avatar} src={comment.author.avatar} alt="头像" />
          <span className={styles.username}>{comment.author.username}</span>
          <span className={styles.create_time}>{moment(comment.creationDate).fromNow()}</span>
        </div>
        <div className={styles.main}>
          <p>{comment.content}</p>
        </div>
      </div>
    );
  }

}

export default Comment;

