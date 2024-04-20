import Image from 'next/image';
import style from '@/styles/navbar.module.scss';

const NavbarAuth = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.logo_container}>
        <Image src='/images/logo-white.svg' alt='Logo' width={200} height={200} priority className={style.logo} />
      </div>
      <div className={style.settings}>
        <div className={style.wrapper_icon}>
          <i className={`fi fi-rr-globe ${style.icon}`}></i>
          <p className={style.text}>En</p>
        </div>
        <hr className={style.line} />
        <button type='button' className={style.button}>
          Help
        </button>
      </div>
    </nav>
  );
};

export default NavbarAuth;
