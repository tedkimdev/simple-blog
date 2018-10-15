import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const PostItem = () => {
  return (
    <div className={cx('post-item')}>
      <h2><a>Title</a></h2>
      <div className={cx('date')}>2017-10-24</div>
      <p>Content</p>
      <div className={cx('tags')}>
        <a>#tag</a>
        <a>#tag</a>
        <a>#tag</a>
      </div>
    </div>
  )
}

const PostList = () => {
  return (
    <div className={cx('post-list')}>
      <PostItem/>
      <PostItem/>
      <PostItem/>
      <PostItem/>
    </div>
  );
};

export default PostList;