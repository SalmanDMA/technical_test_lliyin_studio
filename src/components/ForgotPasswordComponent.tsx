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
import { useRouter } from 'next/navigation';
import SuccessSectionAuth from './SuccessSectionAuth';

const ForgotPasswordComponent = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<ICurrentPage>('password');
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

  const hideEmail = (email: string): string => {
    const [name, domain] = email.split('@');
    const nameHidden = name.charAt(0) + '*'.repeat(name.length - 1);
    const domainName = domain.split('.');
    const domainHidden = domainName[0].charAt(0) + '*'.repeat(domainName[0].length - 1);
    const topLevelDomain = domainName.slice(1).join('.');
    return `${nameHidden}@${domainHidden}.${topLevelDomain}`;
  };

  const handleSubmitFormikEmail = async (values: { email: string }, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      if (values.email !== 'rifaldi@test.co') {
        toast.error('User not found, please type correct email');
        setSubmitting(false);
        return;
      }
      setTemporaryData((prev: ITemporaryDataStateSignIn) => ({ ...prev, ...values }));
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/hotel-business/forgot-password/request`,
        {
          email: values.email,
        }
      );
      if (!data.success) {
        toast.error(data.errors);
        return;
      }

      toast.success('Reset password success. Redirecting...');
      setTimeout(() => {
        setCurrentPage('success');
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitFormikPassword = async (values: { password: string }, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      setTemporaryData((prev) => ({ ...prev, ...values }));
      setCurrentPage('email');
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
      case 'password':
        return (
          <PasswordSectionAuth
            title='Enter your password'
            description='Enter your password for '
            emailSendTo={` ${temporaryData.email ? `${temporaryData.email}.` : 'fahmiauliyarohman@gmail.com.'}`}
            btnBackAvailable={false}
            setCurrentPage={setCurrentPage}
            btnBackText={null}
            temporaryData={temporaryData}
            handleSubmitFormikPassword={handleSubmitFormikPassword}
            initialValues={initialValuesFormikPassword}
            validationSchema={validationSchemaFormikPassword}
            isShowConfirmPassword={false}
            isForgotPassword={true}
            isForgotPasswordLink={false}
            btnSubmitText='Continue'
          />
        );
      case 'email':
        return (
          <EmailSectionAuth
            title='Forgot your password ?'
            description="Confirm your username and we'll send you a link to reset your password."
            btnBackAvailable={false}
            hrefValue=''
            linkValue=''
            temporaryData={temporaryData}
            handleSubmitFormikEmail={handleSubmitFormikEmail}
            initialValues={initialValuesFormikEmail}
            validationSchema={validationSchemaFormikEmail}
            btnRedirect={false}
          />
        );
      case 'success':
        return (
          <SuccessSectionAuth
            title='Check your inbox'
            description={`We just emailed instructions and a reset password link to`}
            descriptionTwo='It might take a few minutes to arrive.'
            emailSendTo={` ${temporaryData.email ? `${hideEmail(temporaryData.email)}` : 'f***********@g*****.com.'}. `}
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

      {currentPage !== 'success' && <ImageContentAuth type='signin' currentPage={currentPage} />}
    </div>
  );
};

export default ForgotPasswordComponent;
