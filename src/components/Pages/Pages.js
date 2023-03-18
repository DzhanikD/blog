import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { page } from '../../createSlice/articlesSlice';

import classes from './Pages.module.scss';

function Pages() {
  const dispatch = useDispatch();
  const articleState = useSelector((state) => state.articleReducer);
  return (
    <Pagination
      defaultCurrent={articleState.page}
      total={articleState.articlesCount}
      className={classes.pagination}
      pageSize={20}
      showSizeChanger={false}
      hideOnSinglePage
      onChange={(e) => dispatch(page(e))}
    />
  );
}

export default Pages;
