import DescriptionInArticle from '../shared/DescriptionInArticle';
import ArticleInformation from '../shared/ArticleInformation';

import classes from './Article.module.scss';

function Article({ body }) {
  const tagList = body.tagList.map((tag) => (
    <div key={crypto.randomUUID()} className={classes.article__tag}>
      {tag}
    </div>
  ));

  const styleForDescription = {
    position: 'absolute',
    top: '35px',
  };

  return (
    <div className={classes.article}>
      <div className={classes.article__content}>
        <ArticleInformation body={body} />
        <DescriptionInArticle
          styleForDescription={tagList.length === 0 ? styleForDescription : null}
          description={body.description}
        />
      </div>
    </div>
  );
}

export default Article;
