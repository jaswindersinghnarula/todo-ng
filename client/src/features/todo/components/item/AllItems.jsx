import Empty from "components/common/Empty";
import Item from "./Item";
import { useContext } from "react";
import ItemContext from "features/todo/contexts/ItemPropvider";

const AllItems = () => {
  const { items } = useContext(ItemContext);
  return (
    <div className="mt-1 p-1">
      {!items.length ? (
        <Empty />
      ) : (
        items.map((item) => {
          return <Item key={item.id} {...item} />;
        })
      )}
    </div>
  );
};

export default AllItems;
