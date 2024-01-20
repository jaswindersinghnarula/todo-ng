import IconButton from "./IconSubmit";
import CheckCircle from "./icons/CheckCircle";

export const TextInput = (props) => {
    const { name, placeholder, onChange, buttonType, size, value } = props;
    const styleLg =
        "text-gray-500 border-2 border-green-500 rounded-2xl px-1 py-2 flex dark:bg-gray-900 bg-gray-200";
    const styleSm =
        "flex w-full dark:bg-gray-900 bg-gray-200 rounded-xl p-1 text-xs";
    return (
        <div className={size === "sm" ? styleSm : styleLg}>
            <input
                type="text"
                placeholder={placeholder || `Enter ${name || "text"}`}
                name={name || "text"}
                className="bg-transparent w-full outline-none border-none mx-2 dark:text-white"
                onChange={onChange}
                value={value || ""}
            />
            {buttonType === "submit" && (
                <IconButton
                    element={
                        <CheckCircle
                            className={`${
                                size === "sm" ? "w-4 h4" : "w-6 h-6"
                            } text-green-500`}
                        />
                    }
                />
            )}
        </div>
    );
};
