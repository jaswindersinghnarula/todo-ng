import { useContext, useEffect } from "react";

import useAxios from "hooks/useAxios";
import ItemContext from "../contexts/ItemPropvider";

const useItems = () => {
  const { items, setItems } = useContext(ItemContext);
  const { axios } = useAxios();

  // Get items.
  const getItems = async (todoId) => {
    try {
      const response = await axios.get(`/todo/${todoId}/items`);
      if (response.status === 200) {
        setItems((_) => response.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  // Add Item.
  const addItem = async (todoId, item) => {
    try {
      const response = await axios.post(`/todo/${todoId}/item`, item);
      if (response.status === 200) {
        setItems((old) => [...old, response.data]);
      }
    } catch (ex) {}
  };

  return { items, setItems, getItems, addItem };
};

export default useItems;
