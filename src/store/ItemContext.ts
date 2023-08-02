import { createContext } from "react";
import { Item } from "../types";

type ItemReducerAction =
      {
    type: "add";
    item: Item;
    }
    | {
        type: "edit";
        item: Item;
    }
    | {
      type: "delete";
      itemId: number;
    };

export const itemReducer = (items: Item[], action: ItemReducerAction) => {
  switch (action.type) {
    case "add": {
      return [...items, action.item];
    }
    case "edit": {
      const idx = items.findIndex((i) => i.id === action.item.id);
      const newItems = [...items];
      newItems[idx] = {
        id: action.item.id,
        message: action.item.message,
      };
      return newItems;
    }
    case "delete": {
      return items.filter((it) => {
        return it.id !== action.itemId;
      });
    }
    default:
      throw Error("Unknown action: " + action);
  }
};

export const ItemsContext = createContext<Item[]>([]);
export const ItemsReducerDispatchContext = createContext<(action :ItemReducerAction) => void>(()=>{});
