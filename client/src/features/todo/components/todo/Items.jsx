import { useEffect } from "react";
import AddItem from "../item/AddItem";
import AllItems from "../item/AllItems";
const Items = (props) => {
  const { todoId, items } = props;
  return (
    <div className="w-5/6 mt-2 p-2 mx-auto">
      <AddItem todoId={todoId} />
      <AllItems items={items} />
    </div>
  );
};

export default Items;
