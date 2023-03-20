import TextArea from 'antd/es/input/TextArea';
import cn from 'classnames';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../InputField';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';

import classes from './FormArticle.module.scss';

function FormArticle({ funcRequest, title, description, textarea, tags, slug }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: `${title !== undefined ? title : ''}`,
      description: `${description !== undefined ? description : ''}`,
      textarea: `${textarea !== undefined ? textarea : ''}`,
      tags: tags?.map((tag) => ({ value: tag })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const styleButton = cn(`${classes['form-article__button']} ${classes['form-article__button--add']}`, {
    [classes['form-article__button--not-tags']]: fields.length === 0,
  });

  const styleInput = {
    width: '874px',
  };

  const onSubmit = (data) => {
    const body = {
      article: {
        title: data.title,
        description: data.description,
        body: data.textarea,
        tagList: data.tags.map((tag) => tag.value),
      },
    };

    const objForCreateArticle = {
      body,
      token,
      slug,
    };

    dispatch(funcRequest(objForCreateArticle));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes['form-article__form-info']}>
        <div className={classes['form-article__input-wrapper']}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <InputField
                styleInput={styleInput}
                placeholder="Title"
                span="Title"
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                value={value}
                status={errors?.title && 'error'}
              />
            )}
            rules={{
              required: 'This field is required',
            }}
          />
          <ErrorMessage errors={errors} name="title" />
        </div>
        <div className={classes['form-article__input-wrapper']}>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <InputField
                styleInput={styleInput}
                placeholder="Title"
                span="Short description"
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                value={value}
                status={errors?.description && 'error'}
              />
            )}
            rules={{
              required: 'This field is required',
            }}
          />
          <ErrorMessage errors={errors} name="description" />
        </div>
        <div className={classes['form-article__input-wrapper']}>
          <Controller
            control={control}
            name="textarea"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <label htmlFor="textarea">
                {' '}
                <span className={classes['form-article__span']}>Text</span>
                <TextArea
                  placeholder="Text"
                  id="textarea"
                  className={classes['form-article__textarea']}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                  status={errors?.textarea && 'error'}
                />
              </label>
            )}
            rules={{
              required: 'This field is required',
            }}
          />
          <ErrorMessage errors={errors} name="textarea" />
        </div>
        <div className={classes['form-article__add-tags']}>
          <div className={classes['form-article__tags']}>
            {fields.map((field, index) => (
              <div key={field.id} className={classes['form-article__input-wrapper']}>
                <Controller
                  control={control}
                  name={`tags.${index}.value`}
                  render={({ field: { onChange, ref, value } }) => (
                    <label htmlFor={index} className={classes['form-article__label']}>
                      {index === 0 && <span className={classes['form-article__span-tags']}>Tags</span>}
                      <Input
                        className={classes['form-article__input-tags']}
                        onChange={onChange}
                        ref={ref}
                        placeholder="Tag"
                        value={value}
                      />
                      <button type="button" className={classes['form-article__button']} onClick={() => remove(index)}>
                        Delete
                      </button>
                    </label>
                  )}
                  rules={{
                    required: true,
                  }}
                />
              </div>
            ))}
          </div>
          <button className={styleButton} type="button" onClick={() => append({ value: '' })}>
            Add tag
          </button>
        </div>
        <div className={classes['form-article__error-tags']}>
          {errors?.tags && 'If you do not want to fill in the tag, then click the delete button'}
        </div>
      </div>
      <Button styleButton={{ width: '319px' }}>Send</Button>
    </form>
  );
}

export default FormArticle;
