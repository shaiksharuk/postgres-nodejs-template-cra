import { useReducer } from "react";
import { ItemInput, ItemList } from "./components/ItemList";
import { Item } from "./types";
import { itemReducer } from "./store/ItemContext";

function App() {
  const [items, dispatch] = useReducer(itemReducer, []);
  const addItem = (item: Item) => {
    dispatch({type: 'add', item})
  }
  const editItem = (item: Item) => {
    dispatch({type: 'edit', item})
  }
  const deleteItem = (itemId:number) => {
    dispatch({type: 'delete', itemId});
  }
  return (
    <div className="App">
      <h1>Sharuk's App</h1>
      <ItemInput addItem={addItem} maxId={Math.max(...[0, ...items.map(i => i.id)])} />
      <ItemList items={items} editItem={editItem} deleteItem = {deleteItem}/>
    </div>
  );
}

export default App;
