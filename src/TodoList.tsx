import { useState } from "react";
import { Todo } from "./model"


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setTodo: React.Dispatch<React.SetStateAction<string>>
}
const TodoList: React.FC<Props> = (props) => {
    const { todos, setTodos, setTodo } = props
    const [editTodo, setEditTodo] = useState<string>('')

    const onHandleDelete = (id: number) => {
        setTodos(todos.filter((item) => item.id !== id))
    }

    const onHandleDone = (id: number) => {
        const data = todos.map(item => {
            if (item.id === id) {
                return { ...item, isDone: true }
            }
            return item
        })
        setTodos(data)
    }
    const onHandleEdit = (id: number, edit: boolean) => {
        if(!edit){

        const data = todos.map(item => {
            if(item.id === id){
                setEditTodo(item.todo)
                return {...item, isEdit: true}
            }
            return item
        })
        setTodos(data)
    }
    else{
        const data = todos.map(item => {
            if(item.id === id){
                return {...item, todo: editTodo,isEdit: false}
            }
            return item
        })
        setTodos(data)
    }
       
    }
  
    const allowDrop = (e: any) => {
        e.preventDefault();
    }
    const drag = (e: any) => {
       e.dataTransfer.setData("text", e.target.id)
    }

    const drop = (e : any) => {
       e.preventDefault();
      const data = e.dataTransfer.getData("text");
      console.log("data", data);
      e.target.appendChild(document.getElementById(data));
    }

    return (
        <>
        <div className="todo_list_container" id="div" onDragOver={(e) => allowDrop(e)} onDrop={(e) => drop(e)}>
            <header>Active Tasks</header>
            {todos.map(item => {
                return (
                    <div className="item_list" key={item.id} id={`text-${item.id}`} draggable={true} onDragStart={(e) => drag(e)}>
                        {item.isDone ?
                            <span className="item_todo_strick">{item.todo}</span> :  <>
                            {!item.isDone && item.isEdit ?  <input type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} /> : <span className="item_todo">{item.todo}</span>}
                        </>
                        }

                        <button className="button_edit" disabled={item.isDone} onClick={() => onHandleEdit(item.id, item.isEdit)}>{item.isEdit ? "Update" : "Edit" }</button>
                        <button className="button_delete" disabled={item.isEdit || item.isDone} onClick={() => onHandleDelete(item.id)}>Delete</button>
                        <button className="button_done" disabled={item.isEdit} onClick={() => onHandleDone(item.id)}>{item.isDone ? "Completed" : "Done" }</button>
                    </div>
                )
            })}
        </div>
        <div id="div1" className="todo_list_container1" onDragOver={(e) => allowDrop(e)} onDrop={(e) => drop(e)}>
           <header> Completed </header>
        </div>
        </>
    )
}

export default TodoList