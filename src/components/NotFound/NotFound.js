import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import classes from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={classes['not-found']}>
      <h1 className={classes['not-found__title']}>Page not found</h1>
      <Link to="/" className={classes['not-found__link']}>
        <HomeOutlined />
        <ArrowLeftOutlined />
        go to main page
      </Link>
    </div>
  );
}

export default NotFound;
