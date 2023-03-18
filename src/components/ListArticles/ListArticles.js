import { Alert, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from '../../createSlice/articlesSlice';
import Article from '../Article';
import Pages from '../Pages';
import Spinner from '../shared/Spinner';

import classes from './ListArticles.module.scss';

function ListArticles() {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.articleReducer.page);

  const offsetArticles = (page) => {
    if (page !== 1) {
      return (page - 1) * 20;
    }
    return 0;
  };

  useEffect(() => {
    dispatch(fetchArticles(offsetArticles(pageState)));
    window.scrollTo(0, 0);
    // console.log('высвечиваю страницы, я в листе');
  }, [dispatch, pageState]);

  const articles = useSelector((state) => state.articleReducer.articles);
  const loading = useSelector((state) => state.articleReducer.loading);
  const error = useSelector((state) => state.articleReducer.error);
  const displayError = useSelector((state) => state.articleReducer.displayError);

  const content =
    !loading && !error ? (
      <>
        <ul className={classes.content__listArticles}>
          {articles.map((el) => (
            <li key={el.slug}>
              <Article body={el} />
            </li>
          ))}
        </ul>
        <Pages />
      </>
    ) : null;

  const spinner = loading ? <Spinner /> : null;

  const cardError =
    error && !loading ? (
      <Space style={{ margin: '50px' }}>
        <Alert style={{ width: '300px' }} message="Error" description={displayError} type="error" showIcon />
      </Space>
    ) : null;

  return (
    <div className={classes.content}>
      {content}
      {spinner}
      {cardError}
    </div>
  );
}

export default ListArticles;
