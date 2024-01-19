import AddTodo from "./components/todo/AddTodo";
import AllTodos from "./components/todo/AllTodos";
import { TodoProvider } from "./contexts/TodoProvider";

const Todos = () => {
    return (
        <TodoProvider>
            <AddTodo />
            <AllTodos />
        </TodoProvider>
    );
};

export default Todos;
