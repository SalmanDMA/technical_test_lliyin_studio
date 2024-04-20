import style from '@/styles/auth.module.scss';
import { IPropsSuccessSectionAuth } from '@/types/auth';
import { Fragment } from 'react';

const SuccessSectionAuth = ({
  title,
  description,
  descriptionTwo,
  emailSendTo,
  handleSubmitEmail,
}: IPropsSuccessSectionAuth) => {
  return (
    <Fragment>
      <div className={style.wrapper}>
        <div className={style.icon_wrapper}>
          <i className={`fi fi-rr-check ${style.icon}`}></i>
        </div>
        <div className={style.text_wrapper}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.description}>
            {description} <span className={style.email}>{emailSendTo}</span> {descriptionTwo}
          </p>
        </div>
        <button type='button' className={style.button} onClick={handleSubmitEmail}>
          Open your email
        </button>
      </div>
    </Fragment>
  );
};

export default SuccessSectionAuth;
