import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Space } from 'antd';

import Button from '../shared/Button';
import CardForm from '../shared/CardForm';
import InputField from '../shared/InputField';
import Title from '../shared/Title';
import ErrorMessage from '../shared/ErrorMessage';
import { clearError, fetchLoginUser } from '../../createSlice/userSlice';

import classes from './SignIn.module.scss';

function SignIn() {
  const dispatch = useDispatch();
  const serverErrorMessages = useSelector((state) => state.userReducer.serverErrorMessages);
  const authorized = useSelector((state) => state.userReducer.authorized);
  const error = useSelector((state) => state.userReducer.error);
  const displayError = useSelector((state) => state.userReducer.displayError);
  const loading = useSelector((state) => state.userReducer.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate('/');
    }
  }, [authorized]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    const body = {
      user: {
        email: data.emailAddress,
        password: data.password,
      },
    };
    dispatch(fetchLoginUser(body));
    if (serverErrorMessages.length > 0) {
      dispatch(clearError());
    }
  };

  const cardError =
    error && !loading ? (
      <Space style={{ margin: '50px' }}>
        <Alert style={{ minWidth: '300px' }} message="Error" description={displayError} type="error" showIcon />
      </Space>
    ) : null;

  const content = !error ? (
    <CardForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign In</Title>
        <div className={classes['sign-in__form-info']}>
          <div className={classes['sign-in__error-message']}>
            {serverErrorMessages['email or password'] ? 'Email or password is invalid' : null}
          </div>
          <Controller
            control={control}
            name="emailAddress"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <InputField
                status={errors?.emailAddress && 'error'}
                type="email"
                placeholder="Email address"
                id="email"
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                value={value}
                span="Email address"
              />
            )}
            rules={{
              required: 'This field is required',
              pattern: {
                value: /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/,
                message: 'incorrect email address',
              },
            }}
          />
          <ErrorMessage errors={errors} name="emailAddress" />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, ref } }) => (
              <InputField
                status={errors?.password && 'error'}
                type="password"
                placeholder="Password"
                id="password"
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                span="Password"
              />
            )}
            rules={{
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'This field must contain at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'This field must contain a maximum of 40 characters',
              },
              pattern: {
                value: /^[\S]+$/,
                message: 'This character is invalid',
              },
            }}
          />
          <ErrorMessage errors={errors} name="password" />
        </div>
        <Button loading={loading}>Login</Button>
      </form>
      <div className={classes['sign-in__transition-sign-up']}>
        Don’t have an account?
        <Link to="/sign-up" className={classes['sign-in__link-sign-up']}>
          Sign Up.
        </Link>
      </div>
    </CardForm>
  ) : null;

  return (
    <>
      {content}
      {cardError}
    </>
  );
}

export default SignIn;
