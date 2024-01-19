import React, { useContext } from "react";
import Todo from "./Todo";
import NoTodo from "./NoTodo";
import { TodoContext } from "../contexts/TodoContext";

const ListTodo = () => {
    const [todo] = useContext(TodoContext);
    return (
        <div className="mt-5">
            {todo.length === 0 ? (
                <NoTodo />
            ) : (
                todo.map((item, key) => {
                    return <Todo key={key} {...item} />;
                })
            )}
        </div>
    );
};

export default ListTodo;
