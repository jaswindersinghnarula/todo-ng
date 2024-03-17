import { useState } from "react";
import ConfirmDelete from "components/ui/ConfirmDelete";
import EllipsisCircle from "components/ui/icons/EllipsisCircle";
import Items from "./Items";
import useTodos from "features/todo/hooks/useTodo";
import TodoTitle from "./TodoTitle";
import IconButton from "components/ui/IconButton";
import { ItemProvider } from "features/todo/contexts/ItemProvider";

const Todo = (props) => {
  const { id, title, status, items, created_at, updated_at } = props;
  const { deleteTodo } = useTodos();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`flex flex-col rounded-2xl  ${
        open
          ? "dark:bg-gray-700 bg-gray-100"
          : "hover:dark:bg-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="flex justify-between items-center p-2">
        <TodoTitle {...props} />
        <div className="flex gap-2">
          <ConfirmDelete
            deleteHandler={() => {
              return deleteTodo(id);
            }}
          />
          <IconButton
            clickHandler={() => setOpen(!open)}
            icon={<EllipsisCircle className="w-6 h-6 text-green-500" />}
          />
        </div>
      </div>
      {open && <Items todoId={id} items={items} />}
    </div>
  );
};

export default Todo;
