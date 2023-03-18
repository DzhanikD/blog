import { Alert, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchEditArticle, resetFlagArticle } from '../../createSlice/creatAndEditArticleSlice';
import CardForm from '../shared/CardForm';
import FormArticle from '../shared/FormArticle';
import Spinner from '../shared/Spinner';
import Title from '../shared/Title';

function EditArticle() {
  const singleArticle = useSelector((state) => state.articleReducer.singleArticle);
  const error = useSelector((state) => state.creatAndEditReducer.error);
  const displayError = useSelector((state) => state.creatAndEditReducer.displayError);
  const loading = useSelector((state) => state.userReducer.loading);
  const flagArticle = useSelector((state) => state.creatAndEditReducer.flagArticle);
  const article = useSelector((state) => state.creatAndEditReducer.article);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (flagArticle) {
      navigate(`/articles/${article.slug}`);
      dispatch(resetFlagArticle());
    }
  }, [flagArticle]);

  const styleForm = {
    width: '938px',
    marginTop: '34px',
  };

  const spinner = loading ? <Spinner /> : null;

  const cardError =
    error && !loading ? (
      <Space style={{ margin: '50px' }}>
        <Alert style={{ minWidth: '300px' }} message="Error" description={displayError} type="error" showIcon />
      </Space>
    ) : null;

  const content =
    !error && !loading ? (
      <CardForm styleForm={styleForm}>
        <Title>Edit article</Title>
        <FormArticle
          funcRequest={fetchEditArticle}
          textarea={singleArticle.body}
          tags={singleArticle.tagList}
          title={singleArticle.title}
          description={singleArticle.description}
          slug={singleArticle.slug}
        />
      </CardForm>
    ) : null;

  return (
    <>
      {content}
      {cardError}
      {spinner}
    </>
  );
}

export default EditArticle;
