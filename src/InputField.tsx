import './App.css';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    OnHandleAdd: (e: React.SyntheticEvent) => void
}
const InputField: React.FC<Props> = (props) => {
    const {todo, setTodo, OnHandleAdd} = props;
  return (
    <>
      <form className='input-form' onSubmit={(e) => OnHandleAdd(e)}>
      <input type="text" placeholder="Enter the todo" className="input_todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button className="input_submit" type="submit">Add</button>
      </form>
    </>
  );
};

export default InputField;
