import React, { useContext, useState } from "react";
import { Task } from "../types";
import { ListContext, TasksReducerDispatchContext } from "../store/toDoContext";

export function ListInput() {
  const [text, setText] = useState("");
  const dispatch = useContext(TasksReducerDispatchContext);
  const tasks = useContext(ListContext);
  const maxId = Math.max(...[0, ...tasks.map(i => i.id)]);
  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  }
  const addListHandler = () => {
    dispatch({ type: 'add', task: { id: maxId + 1, task:text, isDone: false } })
  }
  const unCheckAllTasks =()=>{
    dispatch({type: "unCheckAllTasks",})
  }
  return (
    <div>
      <input type="type" value={text} onChange={onTextChange} />
      <button onClick={addListHandler}>add</button>
      <button onClick={unCheckAllTasks}>clear</button>
    </div>
  )
}
type ListViewProps = {
  task: Task;
};

function ListView({ task: { id, task,isDone } }: ListViewProps) {

  const dispatch = useContext(TasksReducerDispatchContext);
  const chekBoxHandler:React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    dispatch({type: "toggledone", taskId: id})
  }

  const show = (
    <div>
      id: {id}
      <br/>
      task: <span style={isDone ?{textDecoration:'line-through'}:{}}>{task}</span>
      <input type="checkbox" checked={isDone} onChange={chekBoxHandler}></input>
    </div>
  )
  return show;
}

export function ToDoList() {
  const task = useContext(ListContext);
  const renderedItems = task.map(i => <ListView task = {i} key={i.id} />)
  return (
    <div>
      {renderedItems}
    </div>
  )
}
