import useTheme from "../../hooks/useTheme";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";
const ThemeToggler = () => {
    const { theme, toggle } = useTheme();
    return (
        <a
            onClick={(e) => {
                e.preventDefault();
                toggle();
            }}
            href="#"
        >
            {theme === "light" ? (
                <Moon className="w-6 w6" />
            ) : (
                <Sun className="w-6 w6" />
            )}
        </a>
    );
};

export default ThemeToggler;
