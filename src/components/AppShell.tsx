'use client';
import 'bootstrap/dist/css/bootstrap.css';
import '@flaticon/flaticon-uicons/css/all/all.css';
import 'react-toastify/dist/ReactToastify.css';
import font from '@/styles/font.module.scss';

import { useEffect } from 'react';
import NavbarAuth from './NavbarAuth';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NavSideDashboard from './NavSideDashboard';

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' && !pathName.startsWith('/auth')) {
      toast.info('Your session has expired. Redirecting to sign in page...');
      setTimeout(() => {
        signOut({
          callbackUrl: '/auth/signin',
        });
      }, 2000);
    }
  }, [status, pathName]);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <html lang='en'>
      <body className={font.body}>
        {pathName.startsWith('/auth') ? <NavbarAuth /> : <NavSideDashboard />}
        {children}
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Slide}
        />
      </body>
    </html>
  );
};

export default AppShell;
