import { Input } from 'antd';
import { forwardRef } from 'react';

import classes from './InputField.module.scss';

const InputField = forwardRef(({ type, id, placeholder, onChange, onBlur, status, value, styleInput, span }, ref) => (
  <label htmlFor={id}>
    <span className={classes['input-field__span']}>{span}</span>
    <Input
      style={styleInput}
      status={status}
      className={classes['input-field__input']}
      type={type}
      id={id}
      placeholder={placeholder}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  </label>
));

export default InputField;
