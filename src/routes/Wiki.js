import React from 'react';
import { connect } from 'dva';
import cx from 'classnames';
import { Spin } from 'antd';

import styles from './Wiki.less';


class Wiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
    };
  }

  componentDidMount() {
    const iframe = document.getElementById('mywiki');
    iframe.onload = () => {
      this.setState({
        isloading: false,
      });
    };
  }

  componentWillReceiveProps() {

  }

  render() {
    return (
      <div className={styles.wrap}>
        <Spin
          spinning={this.state.isloading}
          tip="Loading..."
          size="large"
        >
          <iframe
            src="http://opbc041f6.bkt.clouddn.com/sf/cdn/reqswiki_01.html"
            className={cx(styles.iframe, { [styles.show]: !this.state.isloading })}
            scrolling="no"
            id="mywiki"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Wiki);
