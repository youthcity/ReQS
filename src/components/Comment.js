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
    // const comment = {
    //   author: { username: 'tiancity', avatar: '' },
    //   content: '并不是这样，共和党议员里反对巴黎协定肯定占大多数，文章中说是全国范围内的共和党人有51%支持，但实际上在国会里有不少议员是为了反对民主党而反对巴黎协定的，最具争议的EPA Pruitt能通过参议院的听证并获得半数以上的支持，就反映了这一点。',
    //   creationDate: '2017-05-31T08:52:54.908Z',
    // };
    const comment = this.props.comment;
    console.log('=======', comment);
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

