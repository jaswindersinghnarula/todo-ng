import { useContext, useEffect } from "react";
import TodoContext from "../contexts/TodoProvider";
import useAxios from "hooks/useAxios";

const useTodos = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { axios } = useAxios();

  // Fetch All Todo At Page Load.
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get("/todo");
        if (response.status === 200) {
          setTodos((old) => response.data);
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchAll();
  }, []);

  // Add New Todo.
  const addTodo = async (todo) => {
    try {
      const response = await axios.post("/todo", todo);
      if (response.status === 200) {
        setTodos((old) => [...old, response.data]);
      }
      return true;
    } catch (ex) {
      return false;
    }
  };

  // Delete Todo.
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/todo/${id}`);
      if (response.status === 200) {
        setTodos((old) => {
          return old.filter((item) => item.id !== id);
        });
      }
      return true;
    } catch (ex) {
      return false;
    }
  };

  return { todos, setTodos, addTodo, deleteTodo };
};

export default useTodos;
