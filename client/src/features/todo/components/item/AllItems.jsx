import Empty from "components/common/Empty";
import Item from "./Item";

const AllItems = (props) => {
  const { items } = props;
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
