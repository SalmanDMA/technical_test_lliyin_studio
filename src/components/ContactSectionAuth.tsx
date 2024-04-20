import style from '@/styles/auth.module.scss';
import { ICurrentPage, IPropsContactSectionAuth, ITemporaryDataStateSignIn } from '@/types/auth';
import { authInputDataContact, authSelectCodeNumber } from '@/utils/inputData';
import { useFormik } from 'formik';
import { Fragment, useEffect } from 'react';
import * as Yup from 'yup';

const ContactSectionAuth = ({
  btnBackAvailable,
  title,
  description,
  setCurrentPage,
  btnBackText,
  setTemporaryData,
  temporaryData,
}: IPropsContactSectionAuth) => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      phone: '',
      prefixphone: '+1',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Required'),
      lastname: Yup.string().required('Required'),
      username: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      prefixphone: Yup.string().required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        setCurrentPage('password');
        setTemporaryData((prev: ITemporaryDataStateSignIn) => ({ ...prev, ...values }));
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (
      temporaryData.firstname &&
      temporaryData.lastname &&
      temporaryData.username &&
      temporaryData.phone &&
      temporaryData.prefixphone
    ) {
      console.log('terjadi');
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
          <p className={style.description}>{description}</p>
        </div>
        <form onSubmit={formik.handleSubmit} className={style.form_wrapper}>
          {authInputDataContact.map((input) => (
            <div className={style.input_wrapper} key={input.id}>
              <label htmlFor={input.name} className={style.label}>
                {input.labelName}
              </label>
              <div className={style.input_container}>
                {input.name === 'phone' ? (
                  <div className={style.input_group}>
                    <select
                      id='prefixphone'
                      name='prefixphone'
                      className={style.select_inner_group}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.prefixphone}
                    >
                      {authSelectCodeNumber.map((code, index) => (
                        <option key={index} value={code.value}>
                          {code.value}
                        </option>
                      ))}
                    </select>

                    <hr className={style.line} />

                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.name}
                      name={input.name}
                      className={`${style.input_inner_group} ${
                        formik.touched[input.name as keyof typeof formik.touched] &&
                        formik.errors[input.name as keyof typeof formik.touched]
                          ? style.error_input
                          : ''
                      }`}
                      autoComplete={input.autoComplete}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[input.name as keyof typeof formik.values]}
                    />
                  </div>
                ) : (
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.name}
                    name={input.name}
                    className={`${style.input} ${
                      formik.touched[input.name as keyof typeof formik.touched] &&
                      formik.errors[input.name as keyof typeof formik.touched]
                        ? style.error_input
                        : ''
                    }`}
                    autoComplete={input.autoComplete}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[input.name as keyof typeof formik.values]}
                  />
                )}
              </div>

              {formik.touched[input.name as keyof typeof formik.touched] &&
                formik.errors[input.name as keyof typeof formik.touched] && (
                  <p className={style.error}>{formik.errors[input.name as keyof typeof formik.touched]}</p>
                )}
            </div>
          ))}

          <div className={style.alert}>
            <i className={`fi fi-rr-info ${style.alert_icon}`}></i>
            <p className={style.alert_text}>
              We&apos;ll text a two-factor authentication code to this number when you sign in.
            </p>
          </div>

          <button type='submit' disabled={formik.isSubmitting || !formik.isValid} className={style.button_continue}>
            {formik.isSubmitting ? 'Loading...' : 'Continue'}
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
      <div className={style.footer + ' ' + style.padding_top_211}>
        <p className={style.footer_text}>All rights reserved. Copyright 2022 – GoForUmrah.com™</p>
      </div>
    </Fragment>
  );
};

export default ContactSectionAuth;
