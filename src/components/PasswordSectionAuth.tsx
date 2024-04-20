import style from '@/styles/auth.module.scss';
import { ICurrentPage, IPropsPasswordSectionAuth } from '@/types/auth';
import { useFormik } from 'formik';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

const PasswordSectionAuth = ({
  isShowConfirmPassword,
  btnBackAvailable,
  title,
  description,
  setCurrentPage,
  btnBackText,
  temporaryData,
  initialValues,
  validationSchema,
  handleSubmitFormikPassword,
  isForgotPassword,
  isForgotPasswordLink,
  emailSendTo,
  btnSubmitText,
}: IPropsPasswordSectionAuth) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmitFormikPassword(values, { setSubmitting });
    },
  });

  useEffect(() => {
    if (temporaryData.password && temporaryData.confirmpassword) {
      formik.setValues(temporaryData);
    }
  }, []);

  return (
    <Fragment>
      <div className={`${style.header} ${btnBackAvailable ? '' : style.padding_top_96}`}>
        {btnBackAvailable && (
          <button onClick={() => setCurrentPage(btnBackText as ICurrentPage)} type='button' className={style.btn_back}>
            <i className={`fi fi-br-angle-left ${style.icon}`}></i>
            Back
          </button>
        )}
        <div className={style.title_wrapper}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.description}>
            {description} {emailSendTo && <span className={style.email}>{emailSendTo}</span>}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className={style.form_wrapper}>
          <div className={style.input_wrapper}>
            <label htmlFor='password' className={style.label}>
              Password
            </label>{' '}
            <label className={style.label} htmlFor='password'></label>
            <div className={style.input_container}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                id='password'
                name='password'
                className={`${style.input} ${
                  formik.touched.password && formik.errors.password ? style.error_input : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {showPassword ? (
                <i className={`fi fi-sr-eye ${style.icon_eye}`} onClick={() => setShowPassword(false)}></i>
              ) : (
                <i className={`fi fi-sr-eye-crossed ${style.icon_eye}`} onClick={() => setShowPassword(true)}></i>
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className={style.error}>{formik.errors.password as string}</p>
            )}
            {isForgotPassword && isForgotPasswordLink && (
              <Link href='/auth/forgot-password' className={style.link}>
                Forgot Password ?
              </Link>
            )}
            {isForgotPassword && !isForgotPasswordLink && (
              <button type='button' onClick={() => setCurrentPage('email')} className={style.link}>
                Forgot Password ?
              </button>
            )}
          </div>

          {isShowConfirmPassword && (
            <div className={style.input_wrapper}>
              <label htmlFor='confirmpassword' className={style.label}>
                Confirm Password
              </label>{' '}
              <label className={style.label} htmlFor='confirmPassword'></label>
              <div className={style.input_container}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Enter your confirm password'
                  id='confirmpassword'
                  name='confirmpassword'
                  className={`${style.input} ${
                    formik.touched.confirmpassword && formik.errors.confirmpassword ? style.error_input : ''
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpassword}
                />
                {showConfirmPassword ? (
                  <i className={`fi fi-sr-eye ${style.icon_eye}`} onClick={() => setShowConfirmPassword(false)}></i>
                ) : (
                  <i
                    className={`fi fi-sr-eye-crossed ${style.icon_eye}`}
                    onClick={() => setShowConfirmPassword(true)}
                  ></i>
                )}
              </div>
              {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                <p className={style.error}>{formik.errors.confirmpassword as string}</p>
              )}
            </div>
          )}

          <button type='submit' disabled={formik.isSubmitting || !formik.isValid} className={style.button_continue}>
            {formik.isSubmitting ? 'Loading...' : btnSubmitText}
          </button>
        </form>
        <div className={style.button_wrapper}>
          <p className={style.button_text + ' ' + style.padding_top_32}>
            By signing in or creating an account, you agree with our
            <span className={style.button_span}> Terms & conditions</span> and
            <span className={style.button_span}> Privacy statement</span>
          </p>
        </div>
      </div>
      <div className={style.footer + ' ' + style.padding_top_password_30}>
        <p className={style.footer_text}>All rights reserved. Copyright 2022 – GoForUmrah.com™</p>
      </div>
    </Fragment>
  );
};

export default PasswordSectionAuth;
