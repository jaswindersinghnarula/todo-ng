import { useContext } from "react";

import useAxios from "hooks/useAxios";
import TodoContext from "../contexts/TodoProvider";
import CommonContext from "contexts/CommonProvider";

const useItems = () => {
  const { setTodos } = useContext(TodoContext);
  const { setLoading } = useContext(CommonContext);
  const { axios } = useAxios();

  // Add Item.
  const addItem = async (todoId, item) => {
    try {
      setLoading(true);
      const response = await axios.post(`/todo/${todoId}/item`, item);
      if (response.status === 200) {
        setTodos((_) => response.data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  // Delete Item.
  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/item/${id}`);
      if (response.status === 200) {
        setTodos((_) => response.data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Status.
  const statusToggle = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/item/${id}/toggle-status`);
      if (response.status === 200) {
        setTodos((_) => response.data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  return { addItem, deleteItem, statusToggle };
};

export default useItems;
