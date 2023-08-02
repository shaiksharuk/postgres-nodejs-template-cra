import { useReducer } from "react";
import { ListInput, ToDoList } from "./components/toDoList";
import { ItemInput, ItemList } from "./components/ItemList";
import { ItemsContext, ItemsReducerDispatchContext, itemReducer } from "./store/ItemContext";
import { ListContext, TasksReducerDispatchContext, listReducer } from "./store/toDoContext";
function App() {
  const [items, dispatch] = useReducer(itemReducer, []);
  const [tasks, taskDispach] = useReducer(listReducer, []);
  return (
    <div className="App">
      <h1>Sharuk's Apps</h1>
      <ItemsContext.Provider value={items}>
        <ItemsReducerDispatchContext.Provider value={dispatch}>
          <div>
            <h2>Messages</h2>
            <ItemInput />
            <ItemList />
          </div>
        </ItemsReducerDispatchContext.Provider>
      </ItemsContext.Provider>
      <ListContext.Provider value={tasks}>
        <TasksReducerDispatchContext.Provider value={taskDispach}>
          <div>
            <h2>TODO List</h2>
            <ListInput />
            <ToDoList />
          </div>
        </TasksReducerDispatchContext.Provider>
      </ListContext.Provider>
    </div>

  );
}

export default App;
