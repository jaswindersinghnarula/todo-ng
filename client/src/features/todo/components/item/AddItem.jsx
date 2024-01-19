import { useState } from "react";
import IconButton from "../../../../components/ui/IconButton";
import PlusCircle from "../../../../components/ui/icons/PlusCircle";
import { TextInput } from "../../../../components/ui/TextInput";
import Xmark from "../../../../components/ui/icons/Xmark";
import useTodos from "../../hooks/useTodo";

const AddItem = ({ todoId }) => {
    const { addItem } = useTodos();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    const toggle = () => {
        setOpen(!open);
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.target[0].value !== "" && addItem(todoId, { title });
                setTitle("");
            }}
            className="flex w-full items-center justify-center gap-1"
        >
            {open ? (
                <>
                    <TextInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        size="sm"
                        buttonType="submit"
                    />
                    <IconButton
                        clickHandler={toggle}
                        icon={<Xmark className="w-4 h-4" />}
                    />
                </>
            ) : (
                <div className="flex gap-1 items-center text-xs">
                    <IconButton
                        clickHandler={toggle}
                        icon={
                            <>
                                <PlusCircle className="w-4 h-4 text-green-500" />
                                Add new item.
                            </>
                        }
                    />
                </div>
            )}
        </form>
    );
};

export default AddItem;
