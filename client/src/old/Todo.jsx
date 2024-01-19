import React, { useContext } from "react";
import moment from "moment/moment";
import Circle from "../icons/Circle";
import CircleCompleted from "../icons/CircleCompleted";
import { TodoContext } from "../contexts/TodoContext";

import Xmark from "../icons/Xmark";
import axios from "axios";

const Todo = (props) => {
    const [todo, setTodo] = useContext(TodoContext);
    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/todo/${id}`,
            );
            if (response.status === 200) {
                setTodo((old) => {
                    return old.filter((item) => item.id !== id);
                });
            }
        } catch (ex) {}
    };
    const toggleStatus = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/todo/${id}/toggle-status`,
            );
            if (response.status === 200) {
                setTodo((old) => {
                    return old.map((item) => {
                        if (item.id === id) item = response.data;
                        return item;
                    });
                });
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    return (
        <div
            className={`group flex mt-1 items-center justify-between py-1 px-2 text-gray-400 rounded-2xl ${
                props.status === "COMPLETE" ? "bg-green-50" : "bg-white"
            }`}
        >
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    toggleStatus(props.id);
                }}
                className={`flex gap-1 transition duration-200 group-hover:text-gray-700 ${
                    props.status === "COMPLETE" &&
                    "text-decoration-line: line-through"
                }`}
            >
                {props.status !== "COMPLETE" ? (
                    <Circle className="w-6 h-6" />
                ) : (
                    <CircleCompleted className="w-6 h-6 text-green-500" />
                )}

                {props.title || "No title."}
            </a>
            <div className="flex gap-1 items-center">
                {/* Can be its own component */}

                <span className="text-xs text-gray-400">
                    {props.status === "COMPLETE"
                        ? `Completed ${moment().to(props.updated_at)}.`
                        : `Created ${moment().to(props.created_at)}.`}
                </span>
                <a
                    href="#"
                    className="transition duration-200 group-hover:text-red-500"
                    onClick={(e) => {
                        e.preventDefault();
                        deleteTodo(props.id);
                    }}
                >
                    <Xmark className="w-6 h-6" />
                </a>
            </div>
        </div>
    );
};

export default Todo;
