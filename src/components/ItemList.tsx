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

type ItemProps = Item;

function ItemView({ id, message }: ItemProps) {
  return (
    <div>
      id: {id}
      <br />
      message: {message}
    </div>
  )
}

type ItemListProps = {
  items: Item[]
}

export function ItemList(props: ItemListProps) {
  const renderedItems = props.items.map(i => <ItemView {...i} />)
  return (
    <div>
      {renderedItems}
    </div>
  )
}