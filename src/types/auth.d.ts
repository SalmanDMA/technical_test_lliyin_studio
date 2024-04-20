export interface IContentHeader {
  title: string;
  description: string;
}

export type ICurrentPage = 'email' | 'contact' | 'password' | 'success' | null;

export interface IPropsSectionContentAuth {
  title: string;
  description: string;
}

export interface IPropsContactSectionAuth extends IPropsSectionContentAuth {
  btnBackAvailable: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<ICurrentPage>>;
  btnBackText?: ICurrentPage;
  setTemporaryData: React.Dispatch<React.SetStateAction<any>>;
  temporaryData: ITemporaryDataState;
}

export interface IPropsPasswordSectionAuth extends IPropsSectionContentAuth {
  btnBackAvailable: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<ICurrentPage>>;
  btnBackText?: ICurrentPage;
  initialValues: any;
  validationSchema: any;
  handleSubmitFormikPassword: (values: any, { setSubmitting }: any) => void;
  isShowConfirmPassword: boolean;
  isForgotPassword: boolean;
  isForgotPasswordLink: boolean;
  temporaryData: ITemporaryDataState;
  emailSendTo?: string;
  btnSubmitText: string;
}

export interface IPropsEmailSectionAuth extends IPropsSectionContentAuth {
  btnBackAvailable: boolean;
  btnBackText?: ICurrentPage;
  linkValue: string;
  hrefValue: string;
  initialValues: any;
  validationSchema: any;
  handleSubmitFormikEmail: (values: any, { setSubmitting }: any) => void;
  temporaryData: ITemporaryDataState;
  btnRedirect: boolean;
}

export interface IPropsSuccessSectionAuth extends IPropsSectionContentAuth {
  descriptionTwo: string;
  emailSendTo: string;
  handleSubmitEmail: () => void;
}

export interface ITemporaryDataStateSignUp {
  email: string;
  password: string;
  confirmpassword: string;
  phone: string;
  prefixphone: string;
  firstname: string;
  lastname: string;
  username: string;
}

export interface ITemporaryDataStateSignIn {
  email: string;
  password: string;
}

export interface IAuthInput {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  iconEye?: string;
  iconEyeSlash?: string;
  labelName: string;
}

export interface IAuthSelectCodeNumber {
  value: string;
  name: string;
}
