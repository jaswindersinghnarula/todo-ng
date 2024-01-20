import { useState } from "react";
import { TextInput } from "components/ui/TextInput";
import useTodos from "features/todo/hooks/useTodo";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        title === "" || (addTodo({ title }) && setTitle(""));
      }}
    >
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        placeholder="Add new todo."
        buttonType="submit"
      />
    </form>
  );
};

export default AddTodo;
