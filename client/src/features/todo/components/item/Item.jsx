import ConfirmDelete from "components/ui/ConfirmDelete";
import HumanizeDate from "components/ui/HumanizeDate";
import Title from "components/ui/Title";
import Circle from "components/ui/icons/Circle";

const Item = (props) => {
    const { title, status, created_at, updated_at } = props;
    return (
        <div className="flex gap-1 items-center">
            <div className="flex gap-2 items-center w-full cursor-pointer">
                <Circle className="w-4 h-4 text-green-500" />
                <Title
                    title={title}
                    size="sm"
                    subTitle={
                        <HumanizeDate
                            text={
                                status === "COMPLETED" ? "Completed" : "Created"
                            }
                            date={
                                status === "COMPLETED" ? updated_at : created_at
                            }
                        />
                    }
                />
            </div>
            <ConfirmDelete size="sm" />
        </div>
    );
};

export default Item;
