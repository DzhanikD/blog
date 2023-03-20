import { Button } from 'antd';

import classes from './Button.module.scss';

function ButtonWrapper({ children, disabled, styleButton, loading }) {
  return (
    <Button
      className={classes.button}
      loading={loading}
      disabled={disabled}
      type="primary"
      htmlType="submit"
      style={styleButton}
    >
      {children}
    </Button>
  );
}

export default ButtonWrapper;
