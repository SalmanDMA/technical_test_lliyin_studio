'use client';
import Image from 'next/image';
import styles from '@/styles/navside.module.scss';
import Link from 'next/link';
import navsideData from '@/utils/navsideData';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const NavSideDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <nav className={styles.nav_container}>
        <div className={styles.nav_wrapper_left}>
          <div className={styles.info_container}>
            <i
              className={`fi fi-br-menu-burger ${styles.icon_menu}`}
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setIsDropdownOpen(false);
                setIsSearchInputOpen(false);
              }}
            ></i>
            <div className={styles.logo_container}>
              <Image src={'/images/western.svg'} alt='Logo' width={200} height={200} className={styles.logo} priority />
            </div>
            <div className={styles.text_container}>
              <h3 className={styles.title}>Big Makkah Hotel</h3>
              <p className={styles.code}>#10292827</p>
            </div>
          </div>
          <Link href={'/'} className={styles.link}>
            See your property
          </Link>
        </div>
        <div className={styles.nav_wrapper_right}>
          <div className={styles.search_container}>
            <input type='text' placeholder='Search' className={styles.search_input} />
            <i
              className={`fi fi-rr-search ${styles.icon_search}`}
              onClick={() => {
                setIsSearchInputOpen(!isSearchInputOpen);
                setIsDropdownOpen(false);
                setIsSidebarOpen(false);
              }}
            ></i>
          </div>
          <div className={styles.icon_container}>
            <div className={styles.icon_wrapper}>
              <i className={`fi fi-rs-bell ${styles.icon}`}></i>
              <span className={styles.badge}></span>
            </div>
          </div>
          <div
            className={styles.dropdown_container}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsSearchInputOpen(false);
              setIsSidebarOpen(false);
            }}
          >
            <i className={`fi fi-rr-user ${styles.icon_user}`}></i>
            <p className={styles.text_dropdown}>{session?.user?.name || 'John Doe'}</p>
            <i className={`fi fi-rr-angle-small-down ${styles.icon_chevron}`}></i>
            <div className={`${styles.dropdown} ${isDropdownOpen ? styles.open : styles.close}`}>
              <div className={styles.dropdown_wrapper}>
                <h3 className={styles.title}>{session?.user?.name || 'John Doe'}</h3>
                <p className={styles.email}>{session?.user?.email || 'johndoe@example.com'}</p>
              </div>
              <div className={styles.dropdown_item}>
                <Link href={'/'} className={styles.dropdown_link}>
                  <i className={`fi fi-rr-user ${styles.icon}`}></i>
                  Profile
                </Link>
                <button
                  type='button'
                  className={styles.dropdown_link}
                  onClick={() => {
                    signOut({ callbackUrl: '/auth/signin' });
                  }}
                >
                  <i className={`fi fi-rr-sign-out-alt ${styles.icon}`}></i>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isSearchInputOpen && (
        <div className={`${styles.search_dropdown} ${isSearchInputOpen ? styles.open : styles.close}`}>
          <div className={styles.search_dropdown_wrapper}>
            <input type='text' placeholder='Search' className={styles.search_dropdown_input} />
            <i className={`fi fi-rr-search ${styles.search_dropdown_icon_search}`}></i>
          </div>
          <i
            className={`fi fi-rr-cross-small ${styles.search_dropdown_icon_close}`}
            onClick={() => {
              setIsSearchInputOpen(false);
              setIsDropdownOpen(false);
              setIsSidebarOpen(false);
            }}
          ></i>
        </div>
      )}

      {isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)}></div>}

      <aside className={`${styles.aside} ${isSidebarOpen ? styles.open : styles.close}`}>
        <div></div>
        <i
          className={`fi fi-rr-cross-small ${styles.icon_close} ${isSidebarOpen ? styles.open : styles.close}`}
          onClick={() => setIsSidebarOpen(false)}
        ></i>
        <div className={styles.logo_container}>
          <Link href='/'>
            <Image src='/images/logo-dark.svg' alt='Logo' width={200} height={200} className={styles.logo} priority />
          </Link>
        </div>
        <div className={styles.list_container}>
          {navsideData.map((item) => (
            <Link
              href={item.path}
              className={`${styles.list_item} ${pathName === item.path ? styles.active : ''}`}
              key={item.id}
            >
              <i className={`${item.icon} ${styles.list_icon} ${pathName === item.path ? styles.active : ''}`}></i>
              <p className={styles.list_text + ' ' + (pathName === item.path ? styles.active : '')}>{item.name}</p>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default NavSideDashboard;
