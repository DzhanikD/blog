import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Checkbox, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { fetchRegistrUser, clearError } from '../../createSlice/userSlice';
import Title from '../shared/Title';
import Button from '../shared/Button';
import CardForm from '../shared/CardForm';
import InputField from '../shared/InputField';
import ErrorMessage from '../shared/ErrorMessage';
import Spinner from '../shared/Spinner';

import classes from './SignUp.module.scss';

function SignUp() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const watchAllFields = watch();
  const dispatch = useDispatch();
  const serverErrorMessages = useSelector((state) => state.userReducer.serverErrorMessages);
  const loading = useSelector((state) => state.userReducer.loading);
  const authorized = useSelector((state) => state.userReducer.authorized);
  const error = useSelector((state) => state.userReducer.error);
  const displayError = useSelector((state) => state.userReducer.displayError);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate('/');
    }

    console.log('юс эффект в sign up');
  }, [serverErrorMessages, authorized]);

  const onSubmit = (data) => {
    const body = {
      user: {
        username: data.userName,
        email: data.emailAddress,
        password: data.password,
      },
    };
    dispatch(fetchRegistrUser(body));
    dispatch(clearError());
    // console.log(data);
  };

  const spinner = loading ? <Spinner /> : null;

  const cardError =
    error && !loading ? (
      <Space style={{ margin: '50px' }}>
        <Alert style={{ minWidth: '300px' }} message="Error" description={displayError} type="error" showIcon />
      </Space>
    ) : null;

  const form =
    !loading && !error ? (
      <CardForm>
        <Title>Create new account</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes['sign-up__form-info']}>
            <div className={classes['sign-up__input-wrapper']}>
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <InputField
                    status={errors?.userName && 'error'}
                    type="text"
                    placeholder="Username"
                    span="Username"
                    id="Username"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
                rules={{
                  required: 'This field is required',
                  minLength: {
                    value: 3,
                    message: 'This field must contain at least 3 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'This field must contain a maximum of 20 characters',
                  },
                  pattern: {
                    value: /^[a-z0-9]+$/,
                    message: 'You can only use latin letters, small case and numbers',
                  },
                }}
              />
              <div className={classes['sign-up__error-message']}>
                {serverErrorMessages?.username && 'This username is already taken'}
              </div>
              <ErrorMessage errors={errors} name="userName" />
            </div>
            <div className={classes['sign-up__input-wrapper']}>
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
              <div className={classes['sign-up__error-message']}>
                {serverErrorMessages?.email && 'This email is already taken'}
              </div>
              <ErrorMessage errors={errors} name="emailAddress" />
            </div>
            <div className={classes['sign-up__input-wrapper']}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <InputField
                    status={errors?.password && 'error'}
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    value={value}
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
            <div className={classes['sign-up__input-wrapper']}>
              <Controller
                control={control}
                name="repeatPassword"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <InputField
                    status={errors?.repeatPassword && 'error'}
                    type="password"
                    placeholder="Password"
                    id="repeat-password"
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    value={value}
                    span="Repeat Password"
                  />
                )}
                rules={{
                  required: 'This field is required',
                  validate: (value) => (watchAllFields.password === value ? true : 'Passwords must match'),
                }}
              />
              <ErrorMessage errors={errors} name="repeatPassword" />
            </div>
          </div>
          <div className={classes['sign-up__wrapper-submit']}>
            <div className={classes['sign-up__input-wrapper']}>
              <Controller
                control={control}
                name="checkbox"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <Checkbox
                    className={classes['sign-up__checkbox']}
                    onChange={(e) => onChange(e.target.checked)}
                    onBlur={onBlur}
                    ref={ref}
                    checked={value}
                  >
                    I agree to the processing of my personal information
                  </Checkbox>
                )}
                rules={{
                  required: 'You must agree to the processing of personal data',
                }}
              />
              <ErrorMessage errors={errors} name="checkbox" />
            </div>
            <Button>Create</Button>
          </div>
        </form>
        <div className={classes['sign-up__transition-sign-in']}>
          Already have an account?
          <Link to="/sign-in" className={classes['sign-up__link-sign-in']}>
            Sign In.
          </Link>
        </div>
      </CardForm>
    ) : null;
  return (
    <>
      {spinner}
      {form}
      {cardError}
    </>
  );
}

export default SignUp;
