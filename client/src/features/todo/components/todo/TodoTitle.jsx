import { useEffect, useState } from "react";
import HumanizeDate from "components/ui/HumanizeDate";
import Title from "components/ui/Title";

const TodoTitle = (props) => {
  const { title, status, items, created_at, updated_at } = props;
  const classCompleted = "text-decoration-line: line-through text-green-400";
  const defaultHumanize = {
    text: "Created",
    date: created_at,
  };
  const [humanize, setHumanize] = useState(defaultHumanize);
  useEffect(() => {
    status === "COMPLETED"
      ? setHumanize({
          text: "Completed",
          date: updated_at,
        })
      : setHumanize(defaultHumanize);
  }, []);
  return (
    <div className="flex strike gap-2 pl-2 items-center">
      ⚡
      <Title
        className={status === "COMPLETED" ? classCompleted : ""}
        title={title}
        postTitle={items.length !== 0 && `(${items.length} Tasks)`}
        subTitle={
          <HumanizeDate
            text={status === "COMPLETED" ? "Completed" : "Created"}
            date={status === "COMPLETED" ? updated_at : created_at}
          />
        }
      />
    </div>
  );
};

export default TodoTitle;
