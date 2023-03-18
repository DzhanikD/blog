import classes from './Title.module.scss';

function Title({ children }) {
  return <h3 className={classes.title}>{children}</h3>;
}

export default Title;
