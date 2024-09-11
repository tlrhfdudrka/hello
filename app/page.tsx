// 'use client';

import styles from './page.module.css';
import ClientClock from '@/app/components/ClientClock';
import { getData } from '@/actions/todoAction';
import Todos from '@/components/Todos/Todos';

export default async function Home() {
  const data = await getData();

  return (
    <div className={styles.wrap}>
      <ClientClock />
      <Todos todos={data} />
    </div>
  );
}
