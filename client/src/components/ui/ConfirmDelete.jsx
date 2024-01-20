import { useState } from "react";
import Xmark from "./icons/Xmark";

const ConfirmDelete = ({ deleteHandler, size }) => {
  const [confirm, setConfirm] = useState(false);
  const toggle = (e) => {
    e.preventDefault();
    setConfirm(!confirm);
  };
  return (
    <div className="flex items-center">
      {!confirm && (
        <a href="#" onClick={toggle}>
          <Xmark
            className={`text-red-500 ${
              size === "sm" ? "w-5 h-5 font-bold" : "w-6 h-6"
            }`}
          />
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
