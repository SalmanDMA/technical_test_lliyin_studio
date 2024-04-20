import { IAuthInput, IAuthSelectCodeNumber } from '@/types/auth';

const authInputDataContact: IAuthInput[] = [
  {
    id: 1,
    name: 'firstname',
    type: 'text',
    placeholder: 'Enter your first name',
    autoComplete: 'off',
    labelName: 'First name',
  },
  {
    id: 2,
    name: 'lastname',
    type: 'text',
    placeholder: 'Enter your last name',
    autoComplete: 'off',
    labelName: 'Last name',
  },
  {
    id: 3,
    name: 'username',
    type: 'text',
    placeholder: 'Enter your username',
    autoComplete: 'off',
    labelName: 'Username',
  },
  {
    id: 4,
    name: 'phone',
    type: 'string',
    placeholder: '(888) 888-8888',
    autoComplete: 'off',
    labelName: 'Phone number',
  },
];

const authSelectCodeNumber: IAuthSelectCodeNumber[] = [
  { value: '+1', name: 'USA' },
  { value: '+7', name: 'Russia' },
  { value: '+62', name: 'Indonesia' },
  { value: '+81', name: 'Japan' },
  { value: '+86', name: 'China' },
  { value: '+91', name: 'India' },
  { value: '+92', name: 'Pakistan' },
  { value: '+93', name: 'Afghanistan' },
  { value: '+94', name: 'Sri Lanka' },
  { value: '+95', name: 'Myanmar' },
];

export { authInputDataContact, authSelectCodeNumber };
