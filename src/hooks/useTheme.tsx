import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const changeTheme = (): void => {
        setTheme(theme == "light" ? "dark" : "light");
        localStorage.setItem("theme", theme == "light" ? "dark" : "light");
    };

    useEffect(() => {
        if (theme == "light") {
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }
    });

    return {
        theme,
        changeTheme,
    };
};

export { useTheme };
