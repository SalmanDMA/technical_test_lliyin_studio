'use client';
import styles from '@/styles/dashboard.module.scss';
import { IProsRoutesNavtab } from '@/types/dashboard';
import { useState } from 'react';

interface IPropsNavTab {
  routes: IProsRoutesNavtab[];
  routesHidden?: string[];
  defaultActiveRoute: string;
  children: React.ReactNode;
}

const NavTab = ({ routes, routesHidden = [], defaultActiveRoute, children }: IPropsNavTab) => {
  const [activeRoute, setActiveRoute] = useState(defaultActiveRoute);
  return (
    <>
      <div className={styles.navtab}>
        {routes.map((route, index) => (
          <button
            className={`${routesHidden.includes(route.title) ? styles.navtab_button_hidden : styles.navtab_button} ${
              activeRoute === route.title ? styles.active : ''
            }`}
            key={index}
            onClick={() => {
              setActiveRoute(route.title);
            }}
          >
            <span className={styles.title}>{route.title}</span>
            {route.bandage && <span className={styles.bandage}>{route.points}</span>}
          </button>
        ))}
      </div>
      {children}
    </>
  );
};

export default NavTab;
