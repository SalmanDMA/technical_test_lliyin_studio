'use client';
import EmailSectionAuth from './EmailSectionAuth';
import style from '@/styles/auth.module.scss';
import { useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import ImageContentAuth from './ImageContentAuth';
import { ICurrentPage, ITemporaryDataStateSignIn } from '@/types/auth';
import PasswordSectionAuth from './PasswordSectionAuth';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInComponent = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<ICurrentPage>('email');
  const [temporaryData, setTemporaryData] = useState<ITemporaryDataStateSignIn>({
    email: '',
    password: '',
  });

  const initialValuesFormikEmail = {
    email: '',
  };

  const initialValuesFormikPassword = {
    password: '',
  };

  const validationSchemaFormikEmail = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const validationSchemaFormikPassword = Yup.object({
    password: Yup.string().required('Required'),
  });

  const handleSubmitFormikEmail = (values: { email: string }, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      if (values.email !== 'rifaldi@test.co') {
        toast.error('User not found, please type correct email');
        setSubmitting(false);
        return;
      }
      setCurrentPage('password');
      setTemporaryData((prev: ITemporaryDataStateSignIn) => ({ ...prev, ...values }));
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitFormikPassword = async (values: { password: string }, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      if (values.password !== 'rifaldi') {
        toast.error('Password wrong, please type correct password');
        return;
      }
      setTemporaryData((prev) => ({ ...prev, ...values }));
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/hotel-business/login`, {
        email: temporaryData.email,
        password: values.password,
      });
      if (!data.success) {
        toast.error('Login failed. Please try again.');
        return;
      }
      const res = await signIn('credentials', {
        email: data.data.email,
        password: values.password,
        token: data.data.token,
        callbackUrl: '/',
        redirect: false,
      });

      if (res?.status === 401) {
        toast.error('Login failed. Please try again.');
        return;
      }

      toast.success('Login success. Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const displayPage = (page: ICurrentPage) => {
    switch (page) {
      case 'email':
        return (
          <EmailSectionAuth
            title='Sign in to manage your property'
            description='Create an account to list and manage your property.'
            btnBackAvailable={false}
            hrefValue='/auth/signup'
            linkValue='Create your partner account'
            temporaryData={temporaryData}
            handleSubmitFormikEmail={handleSubmitFormikEmail}
            initialValues={initialValuesFormikEmail}
            validationSchema={validationSchemaFormikEmail}
            btnRedirect={true}
          />
        );
      case 'password':
        return (
          <PasswordSectionAuth
            title='Enter your password'
            description='Enter your password for'
            emailSendTo={` ${temporaryData.email}.`}
            btnBackAvailable={false}
            setCurrentPage={setCurrentPage}
            btnBackText={null}
            temporaryData={temporaryData}
            handleSubmitFormikPassword={handleSubmitFormikPassword}
            initialValues={initialValuesFormikPassword}
            validationSchema={validationSchemaFormikPassword}
            isShowConfirmPassword={false}
            isForgotPassword={true}
            isForgotPasswordLink={true}
            btnSubmitText='Continue'
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
      <AnimationWrapper keyValue={currentPage as keyof ICurrentPage} className={style.content}>
        {displayPage(currentPage)}
      </AnimationWrapper>

      <ImageContentAuth type='signin' currentPage={currentPage} />
    </div>
  );
};

export default SignInComponent;
