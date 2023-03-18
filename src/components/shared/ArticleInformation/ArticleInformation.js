import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import heart from '../../../img/heart.svg';

import classes from './ArticleInformation.module.scss';

function ArticleInformation({ body, styleForTag }) {
  const tagList = body.tagList?.map((tag) => (
    <div key={crypto.randomUUID()} className={classes['article-content__tag']} style={styleForTag}>
      {tag}
    </div>
  ));

  const date = body.createdAt && format(new Date(body.createdAt), 'MMMM d, yyyy');

  return (
    <div className={classes['article-content__container']}>
      <div className={classes['article-content__wrapper']}>
        <div className={classes['article-content__title-and-likes']}>
          <Link to={`/articles/${body.slug}`} className={classes['article-content__title']}>
            {body.title}
          </Link>
          <button type="button" className={classes['article-content__button']}>
            <img src={heart} alt="like" className={classes['article-content__like']} />
            {body.favoritesCount}
          </button>
        </div>
        <div className={classes['article-content__tags']}>{tagList}</div>
      </div>
      <div className={classes['article-content__info']}>
        <div className={classes['article__user-and-date']}>
          <h3 className={classes['article-content__username']}>{body.author?.username}</h3>
          <span className={classes['article-content__date']}>{date}</span>
        </div>
        <img src={body.author?.image} alt="avatar" width={46} height={46} />
      </div>
    </div>
  );
}

export default ArticleInformation;
