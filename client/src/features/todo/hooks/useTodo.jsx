import { useContext, useEffect } from "react";
import TodoContext from "../contexts/TodoProvider";
import useAxios from "hooks/useAxios";
import useCommon from "hooks/useCommon";

const useTodos = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { axios } = useAxios();
  const { setLoading } = useCommon();

  // Fetch All Todo At Page Load.
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/todo");
        if (response.status === 200) {
          syncTodo(response.data);
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Add New Todo.
  const addTodo = async (todo) => {
    try {
      setLoading(true);
      const response = await axios.post("/todo", todo);
      if (response.status === 200) {
        syncTodo(response.data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  // Delete Todo.
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/todo/${id}`);
      if (response.status === 200) {
        syncTodo(response.data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  const syncTodo = (data) => {
    setTodos((_) => data);
  };

  return { todos, setTodos, addTodo, deleteTodo };
};

export default useTodos;
