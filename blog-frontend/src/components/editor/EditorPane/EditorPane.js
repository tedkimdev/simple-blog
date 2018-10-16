import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class EditorPane extends Component {
  render() {
    return (
      <div className={cx('editor-pane')}>
        <input className={cx('title')} placeholder="Input title" name="title"/>
        <div className={cx('code-editor')}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>Tag</div>
          <input name="tags" placeholder="Enter tags(use , between tags)"/>
        </div>
      </div>
    );
  }
}

export default EditorPane;