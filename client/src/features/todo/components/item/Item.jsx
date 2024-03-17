import ConfirmDelete from "components/ui/ConfirmDelete";
import HumanizeDate from "components/ui/HumanizeDate";
import Title from "components/ui/Title";
import Circle from "components/ui/icons/Circle";
import CircleCompleted from "components/ui/icons/CircleCompleted";
import useItems from "features/todo/hooks/useItem";

const Item = (props) => {
  const { deleteItem, statusToggle } = useItems();
  const { id, title, status, created_at, updated_at } = props;
  return (
    <div className="flex gap-1 items-center hover:dark:bg-gray-800 hover:bg-gray-200 rounded-2xl p-1">
      <div
        onClick={() => statusToggle(id)}
        className="flex gap-2 items-center w-full cursor-pointer"
      >
        {status === "COMPLETED" ? (
          <CircleCompleted className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-green-500" />
        )}
        <Title
          title={title}
          size="sm"
          className={status === "COMPLETED" ? "line-through" : ""}
          subTitle={
            <HumanizeDate
              text={status === "COMPLETED" ? "Completed" : "Created"}
              date={status === "COMPLETED" ? updated_at : created_at}
            />
          }
        />
      </div>
      <ConfirmDelete
        size="sm"
        deleteHandler={() => {
          return deleteItem(id);
        }}
      />
    </div>
  );
};

export default Item;
