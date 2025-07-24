import { createContext, useState } from "react";

interface IThemeProviderProps {
    children: React.ReactNode;
}

interface IThemeContext {
    theme: string | null;
    setTheme: React.Dispatch<React.SetStateAction<string | null>>;
}

const ThemeContext = createContext<IThemeContext>({
    theme: null,
    setTheme: () => {},
});

const ThemeProvider = ({ children }: IThemeProviderProps) => {
    const memoryTheme = localStorage.getItem("theme");

    const [theme, setTheme] = useState<string | null>(
        memoryTheme == "light" ? "light" : "dark",
    );

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
