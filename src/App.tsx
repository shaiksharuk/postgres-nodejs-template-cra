import { useState } from "react";
import { Item, ItemInput, ItemList } from "./components/ItemList";


function App() {
  const [items, setItems] = useState<Item[]>([]);
  const addItem = (item: Item) => {
    setItems([...items, item]);
  }
  const editItem = (item: Item) => {
    const idx = items.findIndex((i) => i.id===item.id)
    if (idx < 0) {
      window.alert(`invlaid idx: ${idx}`);
      return
    }
    const newItems = [...items];
    newItems[idx] = {
      id: item.id,
      message: item.message,
    }
    setItems(newItems);
  }
  return (
    <div className="App">
      <h1>Sharuk's App</h1>
      <ItemInput addItem={addItem} maxId={Math.max(...[0, ...items.map(i => i.id)])} />
      <ItemList items={items} editItem={editItem}/>
    </div>
  );
}

export default App;
