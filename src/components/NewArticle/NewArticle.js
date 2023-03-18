import { useDispatch, useSelector } from 'react-redux';
import { Alert, Space } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchCreatArticle, resetFlagArticle } from '../../createSlice/creatAndEditArticleSlice';
import CardForm from '../shared/CardForm';
import FormArticle from '../shared/FormArticle';
import Spinner from '../shared/Spinner';
import Title from '../shared/Title';

function NewArticle() {
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

  const content = (
    <CardForm styleForm={styleForm}>
      <Title>Create new article</Title>
      <FormArticle funcRequest={fetchCreatArticle} />
    </CardForm>
  );

  return (
    <>
      {content}
      {cardError}
      {spinner}
    </>
  );
}

export default NewArticle;
