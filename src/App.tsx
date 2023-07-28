import { useReducer } from "react";
import { ItemInput, ItemList } from "./components/ItemList";
import { ItemsContext, ItemsReducerDispatchContext, itemReducer } from "./store/ItemContext";

function App() {
  const [items, dispatch] = useReducer(itemReducer, []);

  return (
    <ItemsContext.Provider value={items}>
      <ItemsReducerDispatchContext.Provider value={dispatch}>
        <div className="App">
          <h1>Sharuk's App</h1>
          <ItemInput />
          <ItemList />
        </div>
      </ItemsReducerDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}

export default App;
