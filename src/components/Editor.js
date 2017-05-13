import React from 'react';
import LzEditor from 'react-lz-editor';

import styles from './Editor.less';

function Editor(props) {
  return (
    <div className={styles.wrap}>
      <LzEditor
        {...props}
      />
    </div>
  );
}

export default Editor;
