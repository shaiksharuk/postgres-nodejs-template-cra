import { useState } from "react";
import { Item, ItemInput, ItemList } from "./components/ItemList";


function App() {
  const [items, setItems] = useState<Item[]>([]);
  const addItem = (item: Item) => {
    setItems([...items, item]);
  }
  return (
    <div className="App">
      <h1>Sharuk's App</h1>
      <ItemInput addItem={addItem} maxId={Math.max(...[0, ...items.map(i => i.id)])} />
      <ItemList items={items} />
    </div>
  );
}

export default App;
