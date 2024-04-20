'use client';
import EmailSectionAuth from './EmailSectionAuth';
import style from '@/styles/auth.module.scss';
import { useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import ImageContentAuth from './ImageContentAuth';
import { ICurrentPage, ITemporaryDataStateSignUp } from '@/types/auth';
import ContactSectionAuth from './ContactSectionAuth';
import PasswordSectionAuth from './PasswordSectionAuth';
import SuccessSectionAuth from './SuccessSectionAuth';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const SignUpComponent = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<ICurrentPage>('email');
  const [temporaryData, setTemporaryData] = useState<ITemporaryDataStateSignUp>({
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    prefixphone: '',
    firstname: '',
    lastname: '',
    username: '',
  });

  const initialValuesFormikEmail = {
    email: '',
  };

  const validationSchemaFormikEmail = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const initialValuesFormikPassword = {
    password: '',
    confirmpassword: '',
  };

  const validationSchemaFormikPassword = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/,
        'Password must be at least 10 characters and contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const handleSubmitFormikEmail = (values: any, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      setCurrentPage('contact');
      setTemporaryData((prev: ITemporaryDataStateSignUp) => ({ ...prev, ...values }));
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitFormikPassword = (values: any, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      setCurrentPage('success');
      setTemporaryData((prev: ITemporaryDataStateSignUp) => ({ ...prev, ...values }));
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitEmailSuccess = () => {
    router.push('/auth/signin');
  };

  const displayPage = (page: ICurrentPage) => {
    switch (page) {
      case 'email':
        return (
          <EmailSectionAuth
            title='Create your partner account'
            description='Create an account to list and manage your property.'
            btnBackAvailable={false}
            hrefValue='/auth/signin'
            linkValue='Login'
            temporaryData={temporaryData}
            initialValues={initialValuesFormikEmail}
            validationSchema={validationSchemaFormikEmail}
            handleSubmitFormikEmail={handleSubmitFormikEmail}
            btnRedirect={true}
          />
        );
      case 'contact':
        return (
          <ContactSectionAuth
            title='Contact details'
            description='Create your partner account create an account to list and manage your property'
            btnBackAvailable={true}
            setCurrentPage={setCurrentPage}
            btnBackText='email'
            setTemporaryData={setTemporaryData}
            temporaryData={temporaryData}
          />
        );
      case 'password':
        return (
          <PasswordSectionAuth
            title='Create password'
            description='Use a minimum of 10 characters, including uppercase letters, lowercase letters and numbers.'
            btnBackAvailable={true}
            setCurrentPage={setCurrentPage}
            btnBackText='contact'
            temporaryData={temporaryData}
            handleSubmitFormikPassword={handleSubmitFormikPassword}
            initialValues={initialValuesFormikPassword}
            validationSchema={validationSchemaFormikPassword}
            isShowConfirmPassword={true}
            isForgotPassword={false}
            isForgotPasswordLink={false}
            btnSubmitText='Create Account'
          />
        );
      case 'success':
        return (
          <SuccessSectionAuth
            title='Verify your email address'
            description={`We sent you an email with a verification link to`}
            descriptionTwo='To confirm your account please follow the link in the email we just sent.'
            emailSendTo={` ${temporaryData.email ? `${temporaryData.email}.` : 'fahmiauliyarohman@gmail.com.'}. `}
            handleSubmitEmail={handleSubmitEmailSuccess}
          />
        );
      default:
        return;
    }
  };

  return (
    <div
      className={`${style.auth_container} ${
        currentPage === 'success' ? style.auth_container_display_flex_center_all : style.auth_container_display_flex
      } ${currentPage === 'contact' ? style.height_full : style.height_calc}`}
    >
      <AnimationWrapper
        keyValue={currentPage as keyof ICurrentPage}
        className={currentPage === 'success' ? style.success_container : style.content}
      >
        {displayPage(currentPage)}
      </AnimationWrapper>

      {currentPage !== 'success' && <ImageContentAuth type='signup' currentPage={currentPage} />}
    </div>
  );
};

export default SignUpComponent;
