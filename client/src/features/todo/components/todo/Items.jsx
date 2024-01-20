import { useContext, useEffect } from "react";
import AddItem from "../item/AddItem";
import AllItems from "../item/AllItems";
import useItems from "features/todo/hooks/useItem";

const Items = (props) => {
  const { todoId } = props;
  const { getItems } = useItems();
  useEffect(() => {
    const load = async () => getItems(todoId);
    load();
  }, []);
  return (
    <div className="w-5/6 mt-2 p-2 mx-auto">
      <AddItem todoId={todoId} />
      <AllItems />
    </div>
  );
};

export default Items;
