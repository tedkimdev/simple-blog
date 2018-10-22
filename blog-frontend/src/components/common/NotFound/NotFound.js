import React from 'react';
import styles from './NotFound.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const NotFound = ({onGoBack}) => {
  return (
    <div className={cx('not-found')}>
      <h2>Not Found</h2>
      <Button onClick={onGoBack} theme="outline">
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;