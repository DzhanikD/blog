import classes from './CardForm.module.scss';

function CardForm({ children, styleForm }) {
  return (
    <div className={classes['card-form']} style={styleForm}>
      {children}
    </div>
  );
}

export default CardForm;
