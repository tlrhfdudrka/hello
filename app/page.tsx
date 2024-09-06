'use client';

import styles from './page.module.css';
import ClientClock from '@/components/ClientClock';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleCountDownClick = () => {
    router.push('/countdown');
  };

  return (
    <div className={styles.wrap}>
      <ClientClock />
      <button className={styles.button} onClick={handleCountDownClick}>
        {' '}
        카운트다운 설정
      </button>
    </div>
  );
}
