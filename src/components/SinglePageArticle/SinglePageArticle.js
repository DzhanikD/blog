import { Alert, Space } from 'antd';
import { useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { fetchSingleArticle } from '../../createSlice/articlesSlice';
import { fetchDeleteArticle } from '../../createSlice/creatAndEditArticleSlice';
import ArticleInformation from '../shared/ArticleInformation';
import DescriptionInArticle from '../shared/DescriptionInArticle';
import Spinner from '../shared/Spinner';

import classes from './SinglePageArticle.module.scss';

function SinglePageArticle() {
  const dispatch = useDispatch();

  const params = useParams();
  const { slug } = params;
  const error = useSelector((state) => state.articleReducer.error);
  const displayError = useSelector((state) => state.articleReducer.displayError);
  const loading = useSelector((state) => state.articleReducer.loading);
  const singleArticle = useSelector((state) => state.articleReducer.singleArticle);
  const user = useSelector((state) => state.userReducer.userProfile.username);
  const token = useSelector((state) => state.userReducer.token);

  useEffect(() => {
    dispatch(fetchSingleArticle(slug));
  }, [slug]);

  const styleForDescription = {
    marginTop: '12px',
    color: 'rgba(0, 0, 0, 0.5)',
  };

  const styleForTag = {
    color: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(0, 0, 0, 0.5)',
  };

  const onDeleteArticle = () => {
    const obj = {
      slug,
      token,
    };
    dispatch(fetchDeleteArticle(obj));
  };

  const spinner = loading ? <Spinner /> : null;

  const cardError =
    error && !loading ? (
      <Space style={{ margin: '50px' }}>
        <Alert style={{ width: '300px' }} message="Error" description={displayError} type="error" showIcon />
      </Space>
    ) : null;

  const buttons =
    singleArticle?.author?.username === user ? (
      <div className={classes['single-page__buttons']}>
        <button
          className={`${classes['single-page__button']} ${classes['single-page__button--delete']}`}
          type="button"
          onClick={() => onDeleteArticle()}
        >
          Delete
        </button>
        <Link to={`/articles/${slug}/edit`}>
          <button className={`${classes['single-page__button']} ${classes['single-page__button--edit']}`} type="button">
            Edit
          </button>
        </Link>
      </div>
    ) : null;

  const article =
    !loading && !error ? (
      <div className={classes['single-page']}>
        <ArticleInformation body={singleArticle} styleForTag={styleForTag} />
        <div className={classes['single-page__wrapper']}>
          <DescriptionInArticle description={singleArticle.description} styleForDescription={styleForDescription} />
          {buttons}
        </div>
        <div className={classes['single-page__text']}>
          <ReactMarkdown>{singleArticle.body}</ReactMarkdown>
        </div>
      </div>
    ) : null;

  return (
    <div className={classes.sinlgePage}>
      {spinner}
      {article}
      {cardError}
    </div>
  );
}

export default SinglePageArticle;
