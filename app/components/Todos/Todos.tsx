'use client';
import { FC, useState } from 'react';
import { todoType } from '@/types/todoType';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import styles from './Todos.module.css';
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from '@/actions/todoAction';
interface Props {
  todos: todoType[];
}
const Todos: FC<Props> = ({ todos }) => {
  // 할 일 리스트
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);

  // todo 항목 생성
  const createTodo = (text: string) => {
    const id = (todoItems.at(-1)?.id || 0) + 1;
    addTodo(id, text);
    setTodoItems((prev) => [...prev, { id: id, text, done: false }]);
  };
  // todo 항목 텍스트 변경
  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
    editTodo(id, text);
  };
  // todo 항목 완료상태 변경
  const toggleIsTodoDone = (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
    toggleTodo(id);
  };
  // 삭제
  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  // 날짜 포맷팅 함수
  const getFormattedDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <main className={styles.mainWrap}>
      <div className={styles.todoTitle}>{getFormattedDate()}</div>
      <div className={styles.todoSubtitle}>today TODO list</div>
      <div className={styles.todoList}>
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      <AddTodo createTodo={createTodo} />
    </main>
  );
};
export default Todos;
