'use client';

import { useState, useEffect } from 'react';
import styles from './ClientClock.module.css';
import { useRouter } from 'next/navigation';

const ClientClock = () => {
  const router = useRouter();
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [period, setPeriod] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const currentHours = now.getHours();
      setPeriod(currentHours >= 12 ? 'PM' : 'AM');
      setHours(String(currentHours % 12 || 12).padStart(2, '0'));
      setMinutes(String(now.getMinutes()).padStart(2, '0'));
      setSeconds(String(now.getSeconds()).padStart(2, '0'));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCountDownClick = () => {
    router.push('/countdown');
  };

  return (
    <div className={styles.timeContainer}>
      <div className={styles.timeWrap}>
        <div className={styles.periodBox}>{period}</div>
        <div className={styles.timeBox}>{hours}</div>
        <div className={styles.colon}>:</div>
        <div className={styles.timeBox}>{minutes}</div>
        <div className={styles.colon}>:</div>
        <div className={styles.timeBox}>{seconds}</div>
      </div>
      <button className={styles.button} onClick={handleCountDownClick}>
        {' '}
        카운트다운 설정
      </button>
    </div>
  );
};

export default ClientClock;
