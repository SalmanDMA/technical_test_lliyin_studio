import styles from '@/styles/dashboard.module.scss';

const CardHeader = ({ title, btnText }: { title: string; btnText: string }) => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.button}>{btnText}</button>
    </div>
  );
};

export default CardHeader;
