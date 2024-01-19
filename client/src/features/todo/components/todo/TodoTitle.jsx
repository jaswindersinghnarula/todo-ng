import { useEffect, useState } from "react";
import HumanizeDate from "../../../../components/ui/HumanizeDate";
import Title from "../../../../components/ui/Title";

const TodoTitle = (props) => {
    const { title, status, created_at, updated_at } = props;
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
                subTitle={<HumanizeDate {...humanize} />}
            />
        </div>
    );
};

export default TodoTitle;
