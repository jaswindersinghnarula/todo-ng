import { useContext, useEffect } from "react";
import ThemeContext from "../contexts/ThemeProvider";

export default function useTheme() {
    const { theme, setTheme } = useContext(ThemeContext);
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.getElementsByTagName("html")[0].setAttribute("class", theme);
    }, [theme]);
    const toggle = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };
    return { theme, toggle };
}
