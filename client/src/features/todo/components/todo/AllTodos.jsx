import useTodos from "../../hooks/useTodo";
import Empty from "components/common/Empty";
import Todo from "./Todo";

const AllTodos = () => {
    const { todos } = useTodos();
    return (
        <div className="mt-5 flex flex-col gap-2">
            {todos.length === 0 ? (
                <Empty />
            ) : (
                todos.map((todo) => {
                    return <Todo key={todo.id} {...todo} />;
                })
            )}
        </div>
    );
};

export default AllTodos;
