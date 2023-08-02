import React, { useContext, useState } from "react";
import { Item } from "../types";
import { ItemsContext, ItemsReducerDispatchContext } from "../store/ItemContext";
export function ItemInput() {
  const [text, setText] = useState("");
  const dispatch = useContext(ItemsReducerDispatchContext);
  const items = useContext(ItemsContext);
  const maxId = Math.max(...[0, ...items.map(i => i.id)]);
  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  }

  const addItemhandler = () => {
    dispatch({ type: 'add', item: { id: maxId + 1, message: text } })
    setText("");
  }

  return (
    <div>
      <input type="text" value={text} onChange={onTextChange} />
      <button onClick={addItemhandler}>submit</button>
    </div>
  )
}

type ItemViewProps = {
  item: Item;
};
function ItemView({ item: { id, message } }: ItemViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(ItemsReducerDispatchContext);
  const [text, setText] = useState(message);
  const startEditing = () => {
    setIsEditing(true);
  }
  const cancelEditing = () => {
    setIsEditing(false);
    setText(message);
  }
  const textChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value)
  }
  const editItemHandler = () => {
    dispatch({ type: 'edit', item: { id, message: text } })
    setIsEditing(false);
  }
  const deleteItemHandler = () => {
    dispatch({ type: 'delete', itemId: id });
  };

  const whenViewing = (
    <div>
      id: {id}
      <br />
      message: {message}
      <button onClick={startEditing}>edit</button>
      <button onClick={deleteItemHandler}>delete</button>
    </div>
  )
  const whenEditing = (
    <div>
      id: {id}
      <br />
      <input type="text" value={text} onChange={textChangeHandler} />
      <button onClick={editItemHandler}>apply</button>

      <button onClick={cancelEditing}>cancel</button>
    </div>
  )
  return isEditing ? whenEditing : whenViewing;
}

export function ItemList() {
  const items = useContext(ItemsContext);
  const renderedItems = items.map(i => <ItemView item={i} key={i.id}/>)
  return (
    <div>
      {renderedItems}
    </div>
  )
}