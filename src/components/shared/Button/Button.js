import classes from './Button.module.scss';

function Button({ children, disabled, styleButton }) {
  return (
    <button className={classes.button} disabled={disabled} type="submit" style={styleButton}>
      {children}
    </button>
  );
}

export default Button;
