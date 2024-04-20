import Image from 'next/image';
import style from '@/styles/auth.module.scss';
import { ICurrentPage } from '@/types/auth';

const ImageContentAuth = ({ currentPage, type }: { currentPage: ICurrentPage; type: string }) => {
  return (
    <section
      className={`${style.image_container} ${
        currentPage === 'contact'
          ? style.height_1315
          : currentPage === 'password' && type === 'signup'
          ? style.height_700
          : style.height_full
      }`}
    >
      <Image className={style.image} src='/images/auth-image.jpg' priority alt='auth image' width={500} height={500} />
    </section>
  );
};

export default ImageContentAuth;
