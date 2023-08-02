import { createContext } from "react";
import { Task } from "../types";

type ListReducerAction = 
      {
        type: "add";
        task: Task;
    } 
    | {
        type: "toggledone";
        taskId: number;
    } 
    | {
        type: "unCheckAllTasks";
        
    }
    
export const listReducer = (tasks: Task[], action: ListReducerAction) => {

    switch (action.type) {
        case "add": {
            return[...tasks, action.task]
        }
        case "toggledone":
        {
            const idx = tasks.findIndex((t) => t.id === action.taskId );
            const newTaskList = [...tasks];
            newTaskList[idx] = {
                id: newTaskList[idx].id,
                task:newTaskList[idx].task,
                isDone: !newTaskList[idx].isDone,
            };
            return newTaskList;
        }
        case "unCheckAllTasks":
        {
            const newtasks = tasks.map(t => ({...t, isDone: false}));
            return newtasks;
        }
        default:
            throw Error("Unknown action: " + action);
    }
}

export const ListContext = createContext<Task[]>([]);
export const TasksReducerDispatchContext = createContext<(action : ListReducerAction) => void>(()=>{});
