import { useState } from 'react';
import InputField from './InputField';
import './App.css';
import { Todo } from './model';
import TodoList from './TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const OnHandleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(todo){
    setTodos([...todos, {id: Date.now(), todo: todo, isDone: false, isEdit: false}])
    }
    setTodo("")
  }
  return (
    <>
      <div className="todo_header">TODO LIST</div>
      <InputField todo={todo} setTodo={setTodo} OnHandleAdd={OnHandleAdd} />
      <TodoList todos = {todos} setTodos={setTodos} setTodo={setTodo}/>
    </>
  );
};

export default App;
