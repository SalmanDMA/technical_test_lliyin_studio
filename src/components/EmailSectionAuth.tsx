import style from '@/styles/auth.module.scss';
import { IPropsEmailSectionAuth } from '@/types/auth';
import { useFormik } from 'formik';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import * as Yup from 'yup';

const EmailSectionAuth = ({
  title,
  description,
  hrefValue,
  linkValue,
  btnBackAvailable,
  temporaryData,
  initialValues,
  validationSchema,
  btnRedirect,
  handleSubmitFormikEmail,
}: IPropsEmailSectionAuth) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmitFormikEmail(values, { setSubmitting });
    },
  });

  useEffect(() => {
    if (temporaryData.email) {
      formik.setValues(temporaryData);
    }
  }, []);

  return (
    <Fragment>
      <div className={`${style.header} ${btnBackAvailable ? '' : style.padding_top_96}`}>
        <div className={style.title_wrapper}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.description}>{description}</p>
        </div>
        <form onSubmit={formik.handleSubmit} className={style.form_wrapper}>
          <div className={style.input_wrapper}>
            <label htmlFor='email' className={style.label}>
              Email
            </label>
            <div className={style.input_container}>
              <input
                type='email'
                placeholder='Enter your email'
                id='email'
                name='email'
                className={`${style.input} ${formik.touched.email && formik.errors.email ? style.error_input : ''}`}
                autoComplete='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className={style.error}>{formik.errors.email as string}</p>
            )}
          </div>

          <button type='submit' disabled={formik.isSubmitting || !formik.isValid} className={style.button_continue}>
            {formik.isSubmitting ? 'Loading...' : 'Continue'}
          </button>
        </form>
        <div className={style.button_wrapper}>
          {btnRedirect && (
            <Link href={hrefValue} className={style.button_login}>
              {linkValue}
            </Link>
          )}
          <p className={`${style.button_text} ${btnRedirect ? '' : style.padding_top_32}`}>
            By signing in or creating an account, you agree with our
            <span className={style.button_span}> Terms & conditions</span> and
            <span className={style.button_span}> Privacy statement</span>
          </p>
        </div>
      </div>
      <div className={`${style.footer}`}>
        <p className={style.footer_text}>All rights reserved. Copyright 2022 – GoForUmrah.com™</p>
      </div>
    </Fragment>
  );
};

export default EmailSectionAuth;
