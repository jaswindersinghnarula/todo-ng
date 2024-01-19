import { useState } from "react";
import XCircle from "./icons/XCircle";

const ConfirmDelete = ({ deleteHandler }) => {
    const [confirm, setConfirm] = useState(false);
    const toggle = (e) => {
        e.preventDefault();
        setConfirm(!confirm);
    };
    return (
        <div className="flex items-center">
            {!confirm && (
                <a href="#" onClick={toggle}>
                    <XCircle className="w-6 h-6 text-red-500" />
                </a>
            )}
            {confirm && (
                <div className="flex gap-2 text-xs">
                    <a href="#" onClick={toggle}>
                        Cancel
                    </a>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            deleteHandler();
                        }}
                        href="#"
                        className="text-red-500"
                    >
                        Confirm?
                    </a>
                </div>
            )}
        </div>
    );
};

export default ConfirmDelete;
