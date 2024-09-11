'use client';
import { ChangeEvent, FC, useState } from 'react';
import styles from './AddTodo.module.css';

interface Props {
  createTodo: (value: string) => void; //eslint-disable-line no-unused-vars
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  const [input, setInput] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    createTodo(input);
    setInput('');
  };

  return (
    <div className={styles.addTodo}>
      <input
        type="text"
        className={styles.textBox}
        onChange={handleInput}
        value={input}
      />
      <button className={styles.button} onClick={handleAdd}>
        +
      </button>
    </div>
  );
};

export default AddTodo;
