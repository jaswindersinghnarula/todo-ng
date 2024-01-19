import React, { useContext, useState } from "react";
import CheckCircle from "../icons/CheckCircle";
import { TodoContext } from "../contexts/TodoContext";
import axios from "axios";

const AddTodo = () => {
    const [todo, setTodo] = useContext(TodoContext);
    const [title, setTitle] = useState("");
    const addNewTodo = async (e) => {
        e.preventDefault();
        if (title !== "") {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/todo`,
                    {
                        title: title,
                    },
                );
                if (response.status === 200) {
                    setTodo((old) => {
                        return [...old, response.data];
                    });
                    setTitle("");
                }
            } catch (ex) {}
        }
    };
    return (
        <form
            onSubmit={(e) => addNewTodo(e)}
            className="transition duration-200 hover:border-green-300 flex group border-2 border-gray-100 rounded-2xl py-2 px-2"
        >
            <input
                type="text"
                className="w-full outline-none border-none bg-transparent ml-2"
                placeholder="Add new todo"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <button type="submit">
                <CheckCircle className="w-6 h-6 text-green-500 cursor-pointer" />
            </button>
        </form>
    );
};

export default AddTodo;
