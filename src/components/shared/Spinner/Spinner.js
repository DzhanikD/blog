import { FadeLoader } from 'react-spinners';

import classes from './Spinner.module.scss';

function Spinner() {
  return <FadeLoader color="#1890FF" className={classes.spinner} />;
}

export default Spinner;
