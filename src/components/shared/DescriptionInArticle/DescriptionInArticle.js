import classes from './DescriptionInArticle.module.scss';

function DescriptionInArticle({ description, styleForDescription }) {
  return (
    <p className={classes.description} style={styleForDescription}>
      {description}
    </p>
  );
}

export default DescriptionInArticle;
