import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { HeartFilled } from '@ant-design/icons/lib/icons';

import defaultAvatar from '../../../img/avatar.png';
import { fetchDeleteFavorite, fetchFavorite } from '../../../createSlice/favoritesCountSlice';

import classes from './ArticleInformation.module.scss';

function ArticleInformation({ body, styleForTag }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  const authorized = useSelector((state) => state.userReducer.authorized);
  const { slug } = body;
  const params = useParams();

  const tagList = body.tagList?.map((tag) => (
    <div key={crypto.randomUUID()} className={classes['article-content__tag']} style={styleForTag}>
      {tag}
    </div>
  ));

  const [count, setCount] = useState(body.favoritesCount);
  const [favorited, setFavorited] = useState(body.favorited);

  const onFavorite = () => {
    const obj = { token, slug };

    if (!favorited) {
      dispatch(fetchFavorite(obj));
      setCount(count + 1);
      setFavorited(true);
    }

    if (favorited) {
      dispatch(fetchDeleteFavorite(obj));
      setCount(count - 1);
      setFavorited(false);
    }
  };

  const date = body.createdAt && format(new Date(body.createdAt), 'MMMM d, yyyy');

  return (
    <div className={classes['article-content__container']}>
      <div className={classes['article-content__wrapper']}>
        <div className={classes['article-content__title-and-likes']}>
          {!params.slug ? (
            <Link to={`/articles/${body.slug}`} className={classes['article-content__title']}>
              {body.title}
            </Link>
          ) : (
            <h2 className={`${classes['article-content__title']} ${classes['article-content__no-hover']}`}>
              {body.title}
            </h2>
          )}
          <button
            type="button"
            disabled={!authorized && true}
            onClick={() => onFavorite()}
            className={classes['article-content__button']}
          >
            {!favorited ? (
              <HeartOutlined className={classes['article-content__heart']} />
            ) : (
              <HeartFilled style={{ color: 'red' }} />
            )}
            {count}
          </button>
        </div>
        <div className={classes['article-content__tags']}>{tagList}</div>
      </div>
      <div className={classes['article-content__info']}>
        <div className={classes['article__user-and-date']}>
          <h3 className={classes['article-content__username']}>{body.author?.username}</h3>
          <span className={classes['article-content__date']}>{date}</span>
        </div>
        <img
          src={body.author?.image}
          onError={(e) => e.target.setAttribute('src', defaultAvatar)}
          className={classes['article-content__img']}
          alt="avatar"
          width={46}
          height={46}
        />
      </div>
    </div>
  );
}

export default ArticleInformation;
