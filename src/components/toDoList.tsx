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
    dispatch({ type: 'add', task: { id: maxId + 1, task:text } })
  }
  return (
    <div>
      <input type="type" value={text} onChange={onTextChange} />
      <button onClick={addListHandler}>add</button>
    </div>
  )
}
type ListViewProps = {
  task: Task;
};

function ListView({ task: { id, task } }: ListViewProps) {
  const [isDone, setIsDone] = useState("on");
  const chackBoxHandler:React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    const temp = event.target.value === "off" ? "on" : "off";
    setIsDone(temp);
    console.log(temp);
  }
  const show = (
    <div>
      id: {id}
      <br/>
      task: <span style={isDone === "off"?{textDecoration:'line-through'}:{}}>{task}</span>
      <input type="checkbox"  value={isDone} onChange={chackBoxHandler}></input>
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
