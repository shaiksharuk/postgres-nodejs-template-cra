import React, { useState } from "react";

export type ItemInputProps = {
  addItem: (item: Item) => void
  maxId: number
}

export function ItemInput({ addItem, maxId }: ItemInputProps) {
  const [text, setText] = useState("");
  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  }

  const addItemhandler = () => {
    addItem({ id: maxId + 1, message: text });
    setText("");
  }

  return (
    <div>
      <input type="text" value={text} onChange={onTextChange} />
      <button onClick={addItemhandler}>submit</button>
    </div>
  )
}

export type Item = {
  id: number;
  message: string;
}

type ItemViewProps = {
  item: Item;
  editItem: (item: Item) => void;
  deleteItem: (itemId: number) => void;
};

function ItemView({ item: { id, message }, editItem, deleteItem }: ItemViewProps) {
  const [isEditing, setIsEditing] = useState(false);
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
    editItem({ id, message: text });
    setIsEditing(false);
  }
  const itemId = id;
  const deleteItemHandler = ()=>{deleteItem(itemId)};

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

type ItemListProps = {
  items: Item[]
  editItem: (item: Item) => void
  deleteItem: (itemId: number) => void;
}

export function ItemList(props: ItemListProps) {
  const renderedItems = props.items.map(i => <ItemView item={i} editItem={props.editItem} deleteItem={props.deleteItem}/>)
  return (
    <div>
      {renderedItems}
    </div>
  )
}