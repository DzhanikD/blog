import classes from './ErrorMessage.module.scss';

function ErrorMessage({ errors, name }) {
  return <div className={classes.errors}>{errors[name] ? errors[name].message : null} </div>;
}

export default ErrorMessage;
