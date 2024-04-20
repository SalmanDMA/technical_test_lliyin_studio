import styles from '@/styles/dashboard.module.scss';
import Image from 'next/image';

const Room = () => {
  return (
    <main className={styles.main_construction}>
      <div className={styles.card_construction}>
        <Image
          src='/images/under-construction.svg'
          alt='Logo'
          width={200}
          height={200}
          priority
          className={styles.image}
        />
        <h1 className={styles.title}>Under Construction</h1>
        <p className={styles.paragraph}>We are working on it. Please come back later.</p>
      </div>
    </main>
  );
};

export default Room;
