'use client';
import { ChangeEvent, FC, useState } from 'react';
import { todoType } from '@/types/todoType';
import styles from './Todo.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Props {
  todo: todoType;
  changeTodoText: (id: number, text: string) => void; //eslint-disable-line no-unused-vars
  toggleIsTodoDone: (id: number, done: boolean) => void; //eslint-disable-line no-unused-vars
  deleteTodoItem: (id: number) => void; //eslint-disable-line no-unused-vars
}
const Todo: FC<Props> = ({
  todo,
  changeTodoText,
  toggleIsTodoDone,
  deleteTodoItem,
}) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [isDone, setIsDone] = useState(todo.done);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // done 상태 전환 이벤트 핸들러
  const handleIsDone = async () => {
    toggleIsTodoDone(todo.id, !isDone);
    setIsDone((prev) => !prev);
  };

  //
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    changeTodoText(todo.id, text);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setText(todo.text);
  };

  const handleDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      deleteTodoItem(todo.id);
    }
  };
  return (
    <div className={styles.todoList}>
      <input
        type="checkbox"
        className={styles.checkBox}
        checked={isDone}
        onChange={handleIsDone}
      />
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        readOnly={!editing}
        className={`${todo.done ? styles.lineThrough : ''} ${styles.textBox}`}
      />
      <div className={styles.buttonWrap}>
        {editing ? (
          <button onClick={handleSave} className={styles.button}>
            <i className="fa-regular fa-floppy-disk"></i>
          </button>
        ) : (
          <button onClick={handleEdit} className={styles.button}>
            <i className="fa-solid fa-pen"></i>
          </button>
        )}
        {editing ? (
          <button onClick={handleCancel} className={styles.button}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        ) : (
          <button onClick={handleDelete} className={styles.button}>
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
