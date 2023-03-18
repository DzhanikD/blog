import { Alert, Space } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearError, fetchGetCurrentUser, fetchUpdateUser } from '../../createSlice/userSlice';
import Button from '../shared/Button';
import CardForm from '../shared/CardForm';
import ErrorMessage from '../shared/ErrorMessage';
import InputField from '../shared/InputField';
import Spinner from '../shared/Spinner';
import Title from '../shared/Title';

import classes from './Profile.module.scss';

function Profile() {
  const loading = useSelector((state) => state.userReducer.loading);
  const user = useSelector((state) => state.userReducer.userProfile);
  const token = useSelector((state) => state.userReducer.token);
  const updateUser = useSelector((state) => state.userReducer.updateUser);
  const serverErrorMessages = useSelector((state) => state.userReducer.serverErrorMessages);
  const displayError = useSelector((state) => state.userReducer.displayError);
  const error = useSelector((state) => state.userReducer.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    // reset,
    defaultValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: { userName: `${user?.username}`, emailAddress: `${user?.email}` } });

  useEffect(() => {
    if (updateUser) {
      dispatch(fetchGetCurrentUser(token));
      navigate('/');
      // console.log('я юс эффект c апдэйтюсера');
    }
  }, [updateUser]);

  const onSubmit = (data) => {
    const body = {
      user: {
        username: data.userName,
        email: data.emailAddress,
        password: data.password,
        image: data.avatar,
      },
    };
    const objForRequestPut = {
      body,
      token,
    };

    dispatch(fetchUpdateUser(objForRequestPut));
    dispatch(clearError());
  };

  const spinner = loading ? <Spinner /> : null;

  const cardError =
    error && !loading ? (
      <Space style={{ margin: '50px' }}>
        <Alert style={{ minWidth: '300px' }} message="Error" description={displayError} type="error" showIcon />
      </Space>
    ) : null;

  const content =
    !loading && !error ? (
      <CardForm>
        <Title>Edit Profile</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.profile}>
            <div className={classes.profile__wrapper}>
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <InputField
                    defaultValues={defaultValues}
                    status={errors?.userName && 'error'}
                    type="text"
                    placeholder="Username"
                    id="Username"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    span="Username"
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
              <div className={classes['profile__error-message']}>
                {serverErrorMessages?.username && 'This username is already taken'}
              </div>
              <ErrorMessage errors={errors} name="userName" />
            </div>
            <div className={classes.profile__wrapper}>
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
              <div className={classes['profile__error-message']}>
                {serverErrorMessages?.email && 'This email is already taken'}
              </div>
              <ErrorMessage errors={errors} name="emailAddress" />
              <div className={classes.profile__wrapper}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <InputField
                      status={errors?.password && 'error'}
                      type="password"
                      placeholder="New password"
                      id="password"
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
                      value={value}
                      span="New password"
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
              <div className={classes.profile__wrapper}>
                <Controller
                  control={control}
                  name="avatar"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <InputField
                      status={errors?.avatar && 'error'}
                      type="text"
                      placeholder="Avatar image"
                      id="Avatar"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      span="Avatar image (url)"
                    />
                  )}
                  rules={{
                    required: false,
                    pattern: {
                      value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                      message: 'Invalid url address',
                    },
                  }}
                />
                <ErrorMessage errors={errors} name="avatar" />
              </div>
            </div>
          </div>
          <Button>Save</Button>
        </form>
      </CardForm>
    ) : null;

  return (
    <>
      {spinner} {content} {cardError}
    </>
  );
}
export default Profile;
