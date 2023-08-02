import { createContext } from "react";
import { Task } from "../types";

type ListReducerAction = 
    {
        type: "add";
        task: Task;
    }

export const listReducer = (tasks: Task[], action: ListReducerAction) => {

    switch (action.type) {
        case "add": {
            return[...tasks, action.task]
        }
        default:
            throw Error("Unknown action: " + action);
    }
}

export const ListContext = createContext<Task[]>([]);
export const TasksReducerDispatchContext = createContext<(action : ListReducerAction) => void>(()=>{});
